const RecentPosts = ({ recentPosts }) => {
  return (
    <div style={{ width: '80%', float: 'left', paddingTop:"50px" }}>
      {recentPosts.map((post) => (
        <div style={{width: "88%", marginLeft: "45px"}} key={post.id}>
          <h3>{post.title}</h3>
          <p style={{color: "#b0b0b0"}}>
            {new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </p>
          <div style={{marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap"}}>
            {post.keywords && post.keywords.length > 0 ? (
              post.keywords.map((kw, i) => (
                <span 
                  key={i} 
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "13px",
                    color: "#333",
                  }}
                >
                  {kw}
                </span>
              ))
            ) : (
              <span style={{color:"#999", fontSize:"13px"}}>Brak słów kluczowych</span>
            )}
          </div>
          <div 
            style={{textAlign:"justify"}} 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;