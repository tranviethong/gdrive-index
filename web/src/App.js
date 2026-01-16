import React from "react";
export default function App() {
  localStorage.setItem('apiKey', 'AIzaSyCrplAFEKKT9qn-mRF18qfNEbDa90NO0S8');
  localStorage.setItem('clientId', '235560315556-1l05hu1cr0sbts74ba4g9ijvbs06fmo8.apps.googleusercontent.com');
  localStorage.setItem('rootFolderId', '12me7P6FmgB8vYGWCKe343SaD-3SPDzks');
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
      <button 
        onClick={() => window.location.reload()} 
        style={{padding: '15px 30px', fontSize: '20px', cursor: 'pointer', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '5px'}}
      >
        NHẤN VÀO ĐÂY ĐỂ KÍCH HOẠT CÂY THƯ MỤC
      </button>
    </div>
  );
}
