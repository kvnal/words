import html2canvas from 'html2canvas';
import { useState } from 'react';


const Display = () => {
    const [text,setText]=useState({value:"Here.", color:"#fff",size:24,padding:20, font: 'Segoe UI'})
    const [bg,setBg]=useState({color:"#000",width:1080,height:1080,padding:20})
    const sizes={coverPhoto : [1500,500], highligths:[1080,1920],sqaures : [1080,1080]} //width x hieght
    
     function saveImage(output) {
        const post = document.querySelector('#post');
        html2canvas(post,{scale:4}).then(canvas => {
            const url = canvas.toDataURL();
            const download = document.createElement('a');
            download.download = `${output.slice(0,5)}....png`;
            download.href = url;
            download.click();

        });

    
    }
    

    async function loadFont(fontName){
        var link = document.createElement('link')
        link.rel= 'stylesheet'
        link.type='text/css'
        link.href=`https://fonts.googleapis.com/css2?family=${fontName.split(' ').join('+')}&display=swap`
        document.getElementsByTagName('head')[0].appendChild(link)

        return setText({...text , font : fontName})
    }
    return (
        <div className="displaygrid">
            <div>
                <h2>Playground</h2>
                <div className="playground">
                    
                    <div >

                    <input type="text" defaultValue="here." placeholder="Text" onChange={(e)=>{setText( {...text,value : e.target.value})}}/>
                    <input type="color" className="color" defaultValue="#fff"  onChange={(e)=>setText({...text,color:e.target.value})} />
                    <input type="number" placeholder="Text Size" step="2" defaultValue="24" onChange={(e)=>setText({...text,size:e.target.value})}/>
                    <input type="text" placeholder="Google Font Name" onChange={(e)=>loadFont(e.target.value)}/>
                    </div>
                    
                    <div>
                    <label htmlFor="bg">Background</label>
                    <input type="color" name="bg"   onChange={(e)=>setBg({...bg,color:e.target.value})} />
                    <label htmlFor="padding">Text Padding</label>
                    <input type="range" step='2' defaultValue='20' min="0" max="100" name="padding" onChange={(e)=>setText({...text,padding:e.target.value})} />
                    <div >                        
                        <button onClick={()=>setBg({...bg , width:sizes.coverPhoto[0] , height: sizes.coverPhoto[1]})}>coverPhoto (1.91:1)</button>
                        <button onClick={()=>setBg({...bg , width:sizes.highligths[0] , height: sizes.highligths[1]})}>highligths (9:16)</button>
                        <button onClick={()=>setBg({...bg , width:sizes.sqaures[0] , height: sizes.sqaures[1]})}>squares (1:1)</button>
                    </div>
                    </div>
                    <button onClick={()=>saveImage(text.value)}>Save</button>
                </div>
            </div>
        <div className="display" id="post" style={{ backgroundColor: bg.color , height:`${bg.height/4}px`, width: `${bg.width/4}px`}}>
            <p className="text"  style={{color: text.color, fontSize:`${text.size}px`,padding:`0 ${text.padding}px 0 ${text.padding}px`,fontFamily: text.font}} >{text.value}</p>
        </div>
        </div>
    );
};

export default Display;