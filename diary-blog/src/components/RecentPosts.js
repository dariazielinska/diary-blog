const RecentPosts = ({ recentPosts }) => {
  return (
    <div style={{ width: '80%', float: 'left', paddingTop:"50px" }}>
      {recentPosts.map((post) => (
        <div style={{width: "88%", marginLeft: "45px"}} key={post.id}>
          <h3>{post.title}</h3>
          <p style={{color: "#b0b0b0"}}>{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
          <p style={{textAlign:"justify"}}>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;