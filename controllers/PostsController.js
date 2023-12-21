import PostModel from "../models/Post.js";

export const getLastTags= async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts.map(obj=> obj.tags).flat().slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can not get posts",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can not get posts",
    });
  }
};
export const getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params.tag; // Припустимо, що тег передається через параметр URL

    const posts = await PostModel.find({ tag: tag }).populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can not get posts by tag",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    ).populate("user");

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can not get posts",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can not remove post',
    });
  }
};


export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(' '),
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed create a post",
    });
  }
};

export const update =async (req, res)=>{
  try {
    const postId = req.params.id;

    await PostModel.updateOne({
      _id:postId,
    },
    {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      tags: req.body.tags.split(' '),
    },
    res.json({
      success: true,
    }))
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can not update post"
    })
  }
};
