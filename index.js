import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const postTitles=[];
const postList= [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.render("index.ejs",{post: postList, title: postTitles})
});

app.get("/create", (req,res) =>{
    res.render("create.ejs");
});

app.get("/article/:id", (req,res) =>{
    const articleId = req.params.id;
    if (articleId >= 0 && articleId < postList.length) {
        const selectedPost = postList[articleId];
        const selectedTitle = postTitles[articleId];
        res.render("article.ejs", { post: selectedPost, title: selectedTitle });
      } else {
        // Se l'ID non è valido
        res.redirect("/"); 
      }
})

app.get("/edit/:id", (req,res)=>{
    const editArticleId= req.params.id;
    if (editArticleId >= 0 && editArticleId < postList.length) {
        const selectedPost = postList[editArticleId];
        const selectedTitle = postTitles[editArticleId];
        res.render("edit.ejs", { post: selectedPost, title: selectedTitle, id: editArticleId });
      } else {
        // Se l'ID non è valido
        res.redirect("/"); 
      }
})


app.get("/delete/:id",(req,res)=>{
    const articleId= req.params.id;
    if (articleId >= 0 && articleId < postList.length){
        postList.splice(articleId,1);
        postTitles.splice(articleId,1);

        res.redirect(`/#post${articleId}`)
    }
    else {
    // Se l'ID non è valido, reindirizza alla home
    res.redirect("/");
    }
})

app.post("/submit", (req,res) =>{
    postTitles.push(req.body.blogTitle);
    postList.push(req.body.blogPost);
    res.render("index.ejs", {post: postList, title: postTitles})
});

app.post("/put/:id", (req,res) =>{
    const idToEdit = req.params.id;
    const updateTitle = req.body.blogTitle;
    const updatePost = req.body.blogPost;
    if (idToEdit >= 0 && idToEdit < postList.length){
        postTitles.splice(idToEdit, 1, updateTitle);
        postList.splice(idToEdit, 1, updatePost);
        res.render("index.ejs", {post: postList, title: postTitles});
    }
    else{
        res.redirect("/");
    }
  
});

app.listen(port, () =>{
    console.log("Listening on port: "+port);
});

