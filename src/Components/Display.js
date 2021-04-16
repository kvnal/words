import html2canvas from 'html2canvas';
import { useState } from 'react';


const Display = () => {
    const [text,setText]=useState({value:"Here.", color:"#fff",size:40})
    const [bg,setBg]=useState({color:"#000",width:1080,height:1080})

     function saveImage() {
        const post = document.querySelector('#post');
        html2canvas(post,{scale:3}).then(canvas => {
            const url = canvas.toDataURL();
            const download = document.createElement('a');
            download.download = 'image.png';
            download.href = url;
            download.click();

        });

    
    }
    return (
        <div className="displaygrid">
            <div>
                <h2>Playground</h2>
                <div className="playground">
                    
                    <div >

                    <input type="text" defaultValue="here." placeholder="Text" onChange={(e)=>{setText( {...text,value : e.target.value})}}/>
                    <input type="color" className="color" defaultValue="#fff"  onChange={(e)=>setText({...text,color:e.target.value})} />
                    <input type="number" placeholder="Text Size" step="2" defaultValue="40" onChange={(e)=>setText({...text,size:e.target.value})}/>
                    </div>
                    
                    <div>

                    <label htmlFor="bg">Background</label>
                    <input type="color" name="bg"   onChange={(e)=>setBg({...bg,color:e.target.value})} />

                    </div>
                    <button onClick={saveImage}>Save</button>
                </div>
            </div>
        <div className="display" id="post" style={{ backgroundColor: bg.color , height:`${bg.height/3}px`, width: `${bg.width/3}px` }}>
            <p className="text"  style={{color: text.color, fontSize:`${text.size}px`}} >{text.value}</p>
        </div>
        </div>
    );
};

export default Display;