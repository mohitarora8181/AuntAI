import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaDownload } from "react-icons/fa6";
import Slide from '@mui/material/Slide';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImageGenerator = ({ isOpen, setGenOpen }) => {
    const [prompt, setPrompt] = useState("");
    const [base64, setBase64] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClose = (e) => {
        setBase64("");
        setPrompt("")
        if (e.target.innerText == "CLOSE") {
            setGenOpen(false);
        }
    };

    // axios.defaults.headers.common["Authorization"] = process.env.NEXT_PUBLIC_GETIMG_API_KEY;
    axios.defaults.headers.common["authorization"] = process.env.NEXT_PUBLIC_GETIMG_API_KEY;

    const handleGenerate = async () => {
        try {
            if (prompt.trim() != "") {
                setLoading(true)
                await axios.post("https://api.edenai.run/v2/image/generation", {
                    text:prompt,
                    providers:"replicate",
                    num_images:1,
                    resolution:"512X512"
                }).then(({ data }) => {
                    setBase64(data.replicate.items[0])
                })
            } else {
                alert("Please write appropriate prompt")
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                disableEscapeKeyDown
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className=' font-bold font-mono'>{"Generate Image"}</DialogTitle>
                <DialogContent className=' scrollbar-thin'>
                    <DialogContentText className='mb-2'>
                        Let's write some meaningful prompt to generate a customized image
                    </DialogContentText>
                    {loading && <dotlottie-player src="animations/square_loader.json" background="transparent" speed="1" style={{ width: "60%", height: "60%" , marginLeft : "20%"}} loop autoplay></dotlottie-player>}
                    {base64 && <img className=' select-none' src={base64.image_resource_url}></img>}
                    <TextField autoFocus spellCheck value={prompt} onChange={(e) => setPrompt(e.target.value)} className='my-5' fullWidth label="Enter prompt here" color='secondary' id="fullWidth" focused />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className='w-1/2' color='secondary'>Close</Button>
                    <div className='w-1/2 flex align-middle justify-center'>
                        {base64 ? <a download={prompt} className='self-center flex align-middle cursor-pointer border transition-all border-fuchsia-600 rounded-xl text-fuchsia-600 hover:bg-black hover:text-white' href={"data:image/jpeg;base64," + base64} ><FaDownload size={18} className='m-2' /> <p className='self-center m-1 mr-2'>Download</p></a> : <Button onClick={handleGenerate} color='secondary'>Generate</Button>}
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ImageGenerator
