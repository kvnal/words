import html2canvas from 'html2canvas';
import { useState } from 'react';
import { BiSave, BiAlignMiddle, BiAlignLeft, BiAlignRight } from 'react-icons/bi';

const Display = () => {
    const [text, setText] = useState({ value: "Text Here...", color: "#fff", size: 24, padding: 20, font: 'Segoe UI', align: 'center' });
    const [bg, setBg] = useState({ color: "#000", width: 1080, height: 1080, padding: 20 });
    const sizes = { coverPhoto: [1500, 500], highligths: [1080, 1920], sqaures: [1080, 1080] }; //width x hieght

    function saveImage(output) {
        document.body.scrollTop=0; //safari
        document.documentElement.scrollTop=0; //chrome
        const post = document.querySelector('#post');
        html2canvas(post, { scale: 4 }).then(canvas => {
            const url = canvas.toDataURL();
            const download = document.createElement('a');
            download.download = `${output.slice(0, 5)}.png`;
            download.href = url;
            download.click();

        });


    }


    async function loadFont(fontName) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.split(' ').join('+')}&display=swap`;
        document.getElementsByTagName('head')[0].appendChild(link);

        return setText({ ...text, font: fontName });
    }
    return (
        <div className="displaygrid">
            <div>

                <div className="playground shadow-md">
                    <h2>Playground</h2>
                    
                    <div >

                        <textarea rows='5' type="text" defaultValue={text.value} placeholder="Text" onChange={(e) => {
                            console.log(e.target.value);
                            setText({ ...text, value: e.target.value });
                        }} />

                        <div className="align">
                            <div>

                                <span>Text Size</span>
                                <input type="number" className="text-field size" placeholder="Text Size" step="2" defaultValue="24" onChange={(e) => setText({ ...text, size: e.target.value })} />
                            </div>

                            <div>
                                <span>Text Color</span>
                                <input type="color" className="color" defaultValue="#fff" onChange={(e) => setText({ ...text, color: e.target.value })} />
                            </div>
                        </div>

                        <div className="align">
                            {/* <div> */}

                                <button className="mar-align" onClick={() => setText({ ...text, align: 'left' })}><BiAlignLeft size={"1.5em"} /></button>
                                <button className="mar-align" onClick={() => setText({ ...text, align: 'center' })}><BiAlignMiddle size={"1.5em"} /></button>
                                <button className="mar-align" onClick={() => setText({ ...text, align: 'right' })}><BiAlignRight size={"1.5em"} /></button>
                            {/* </div> */}

                            <div>
                                <span>Font</span>
                                <input type="text" placeholder="Google Font Name" className="text-field" onChange={(e) => loadFont(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="background">
                        <h2>Background</h2>
                        {/* <label htmlFor="bg">Color</label> */}
                        <label htmlFor="padding">Padding</label>
                        <input type="range" step='2' defaultValue='20' min="0" max="100" name="padding" onChange={(e) => setText({ ...text, padding: e.target.value })} />
                        
                    <div className="bgcolor">
                        <span>Background Color</span>
                        <input type="color" className="color" name="bg" onChange={(e) => setBg({ ...bg, color: e.target.value })} />
                        </div>

                        <div className="align">
                            <button className="mar-align b" onClick={() => setBg({ ...bg, width: sizes.coverPhoto[0], height: sizes.coverPhoto[1] })}>coverPhoto (1.91:1)</button>
                            <button className="mar-align b " onClick={() => setBg({ ...bg, width: sizes.highligths[0], height: sizes.highligths[1] })}>highligths (9:16)</button>
                            <button className="mar-align b" onClick={() => setBg({ ...bg, width: sizes.sqaures[0], height: sizes.sqaures[1] })}>squares (1:1)</button>
                        </div>
                    </div>

                    <div className="centered-label">

                        <button className="centered-label" onClick={() => saveImage(text.value)}><BiSave size={'2em'} /></button>
                    </div>
                </div>
            </div>
            <div className="display" id="post" style={{ backgroundColor: bg.color, height: `${bg.height / 4}px`, width: `${bg.width / 4}px` }}>
                <p className="text" style={{ color: text.color, fontSize: `${text.size}px`, padding: `0 ${text.padding}px 0 ${text.padding}px`, fontFamily: text.font, textAlign: text.align }} >
                    {
                        text.value.split('\n').map(line => <p >{line}</p>)
                    }</p>
            </div>
            <p className="by">github.com/kvnal</p>
        </div>
    );
};

export default Display;