import postmodel from "../Models/postmodel.js";



// CREATE a post — must be logged in
const createpost = async (req,res) => {
    try {
        const {title,content} = req.body;
        const author = req.user.userId; // Get the user ID from the authenticated request
        console.log("Authenticated user ID:", author); // Log the user ID for debugging
        if(!title || !content || !author){
            return res.status(400).send({status:"failed",message:"All fields are required"});
        }
        const Post = await postmodel.create({title, content, author});
        return res.status(201).send({status:"OK", data : Post})
    } catch (error) {
        res.status(500).send({status:"failed",error, message:error.message})
    }
}

// GET all posts — public
const getpost = async (req, res) => {
    try {
      const posts = await postmodel.find().populate("author","name email").sort({ createdAt: -1 });
      res.status(200).send(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // get a single post by ID — public
  const singlepost = async (req, res) => {
    try {
      const post = await postmodel.findById(req.params.id).populate("author", "name email");
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


// UPDATE a post — must be logged in AND be the owner
const editpost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        console.log("Authenticated user ID:", req.user.userId); // Log the user ID for debugging
        

        const post = await postmodel.findById(postId);
        if (!post) {
            return res.status(404).send({ status: "failed", message: "Post not found" });
        }

        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).send({ status: "failed", message: "You are not authorized to update this post" });
        }

        // Update the post
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).send({ status: "OK", data: post });
    } catch (error) {
        res.status(500).send({ status: "failed", error, message: error.message });
    }
}


// DELETE a post — must be logged in AND be the owner
const deletepost = async (req, res) => {
  
    try {
        const { postId } = req.params;
       

        const post = await postmodel.findById(postId);
        if (!post) {
            return res.status(404).send({ status: "failed", message: "Post not found" });
        }

        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).send({ status: "failed", message: "You are not authorized to delete this post" });
        }

        // Delete the post
        await post.deleteOne();

        res.status(200).send({ status: "OK", message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).send({ status: "failed", error, message: error.message });
    }
}

export {createpost,getpost,singlepost,editpost,deletepost}