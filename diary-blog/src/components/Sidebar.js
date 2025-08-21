import Archive from './Archieve';
import Calendar from './Calendar';
import Keywords from './Keywords';

const Sidebar = ({ setRecentPosts }) => {

  const divStyle = { 
    width: '18%', 
    display:'flex', 
    flexDirection:'column', 
    paddingTop: "50px" 
  }

  const smallerDivStyle = { 
    width: '80%', 
    display:'flex', 
    flexDirection:'column', 
    justifyContent: 'center',
    marginTop: "50px" 
  }

  return (
    <div style={window.innerWidth <= 460 ? smallerDivStyle : divStyle}>
      <Archive setRecentPosts={setRecentPosts} />
      <Calendar setRecentPosts={setRecentPosts} />
      <Keywords setRecentPosts={setRecentPosts} />
    </div>
  );
};

export default Sidebar;