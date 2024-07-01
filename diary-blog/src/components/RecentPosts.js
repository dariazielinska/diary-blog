import React from 'react';

const RecentPosts = () => {
  const recentPosts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3' },
  ];

  return (
    <div style={{ width: '90%', float: 'left' }}>
      <h2>Recent Posts</h2>
      {recentPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
