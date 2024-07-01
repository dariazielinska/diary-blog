const RecentPosts = ({ recentPosts }) => {
  return (
    <div style={{ width: '85%', float: 'left' }}>
      <h2>Recent Posts</h2>
      {recentPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;