const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
const API_KEY=process.env.GNEWS_API_KEY;

app.use(express.static(path.join(__dirname,"public")));

const map={
  India:"India",World:"world",Politics:"politics",Business:"business",
  Technology:"technology",Science:"science",Health:"health",Sports:"sports",Entertainment:"entertainment"
};

function normalize(x,category){
 return {
  title:x.title, description:x.description||"", url:x.url, image:x.image||"",
  publishedAt:x.publishedAt, source:x.source?.name||"Unknown source", category
 };
}
app.get("/api/news",async(req,res)=>{
 try{
  if(!API_KEY)return res.status(500).json({error:"GNEWS_API_KEY is not configured"});
  const category=req.query.category||"All", search=(req.query.search||"").trim();
  let url;
  if(search){
   url=`https://gnews.io/api/v4/search?q=${encodeURIComponent(search)}&lang=en&country=in&max=20&apikey=${API_KEY}`;
  }else{
   const topic=map[category];
   url=topic
    ? `https://gnews.io/api/v4/top-headlines?category=${encodeURIComponent(topic)}&lang=en&country=in&max=20&apikey=${API_KEY}`
    : `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=20&apikey=${API_KEY}`;
  }
  const r=await fetch(url); const data=await r.json();
  if(!r.ok)return res.status(r.status).json(data);
  let articles=(data.articles||[]).map(x=>normalize(x,category));
  if(category==="All"&&!search){
    // GNews can return a broad India feed; keep it as the homepage feed.
  }
  res.json({articles});
 }catch(e){res.status(500).json({error:e.message})}
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Global News Hub running on http://localhost:${PORT}`));
