import User from '../models/user'

export const getDetailedComment = async (comment)  => {
  const commentUser = await User.findById(comment.user)
  const detailedComment = Object.assign(
    {}, 
    comment.toObject(),
    { user: { username: commentUser.username, userId: commentUser.id } }
  )
  return detailedComment;
}

export const getDetailedComments = async (comments)  => {
  const detailedComments = []; 
  
  for (let comment of comments) {
    const detailedComment = await getDetailedComment(comment);
    detailedComments.push(detailedComment);
  }
  
  return detailedComments;
}

export const getDetailedPost = async (id) => {
  const postUser = await User.findOne({ 'posts._id': id });
  const post = postUser.posts.id(id);
  
  const detailedPost = Object.assign(
    {},
    post.toObject(),
    { comments: await getDetailedComments(post.comments) }, 
    { user: { username: postUser.username, userId: postUser.id } }
  )
  
  return detailedPost;
}

export const getDetailedPosts = async () => {
  const posts = await User.find({}, 'posts -_id');
  const allPosts =  posts
  .map(userPosts => userPosts.posts.map(post => post))
  .flat()
  
  const detailedPosts = [];
    
  for (let post of allPosts) {
    const detailedPost = await getDetailedPost(post.id);
    detailedPosts.push(detailedPost);
  }
  
  return detailedPosts.sort(() => -1);
}

export const getUserPosts = async (id) => {
  const user = await User.findById(id);
  const userPosts = user.posts
  
  const detailedUserPosts = []
  
  for (let post of userPosts) {
    const detailedPost = await getDetailedPost(post.id);
    detailedUserPosts.push(detailedPost);
  }
  
  return detailedUserPosts.sort(() => -1);
}

export const getUserAndPosts = async (id) => {
  const user = await User.findById(id);
  const userPosts = user.posts
  
  const detailedUserPosts = []
  
  for (let post of userPosts) {
    const detailedPost = await getDetailedPost(post.id);
    detailedUserPosts.push(detailedPost);
  }
  
  return { user: user.username, posts: detailedUserPosts.sort(() => -1) };
}