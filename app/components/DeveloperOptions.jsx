import { Box, FormControl, InputLabel, Select, Slider } from '@mui/material'

import React, { useEffect, useState } from 'react'


const DeveloperOptions = ({ open, setOpen, setDeveloperOptions }) => {

    const [model, setModel] = useState("gemini-pro");
    const [temperature, setTemperature] = useState();
    const [maxTokens, setMaxTokens] = useState();
    const [topP, setTopP] = useState();
    const [topK, setTopK] = useState();
    const [frequencyPenalty, setFrequencyPenalty] = useState();
    const [presencePenalty, setPresencePenalty] = useState();


    const [hide, setHide] = useState(true);

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setHide(true);
            }, 200);
        } else {
            setHide(false)
        }
    }, [open])


    useEffect(() => {
        setDeveloperOptions({ model, temperature, maxTokens, topP, frequencyPenalty, presencePenalty });
    }, [model, temperature, maxTokens, topP,topK, frequencyPenalty, presencePenalty])

    return (
        <div className={`w-full dark:text-black ${open ? "block animate-slideInRight" : "animate-slideOut delay-75"} ${hide ? "hidden" : "block"} mb-3 mx-0 px-1 bg-white border border-gray-500 rounded-lg flex flex-col`}>
            <FormControl className='w-[90%] self-center mt-5' sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Select Model</InputLabel>
                <Select onChange={(e) => { setModel(e.target.value) }} native defaultValue="gemini-pro" id="grouped-native-select" label="Select Model" labelId="demo-simple-select-helper-label">
                    <option aria-label="None" value="" />
                    <optgroup label='Gemini'>
                        <option value='gemini-pro'>Gemini Pro</option>
                    </optgroup>
                    <optgroup label="Krutrim ( works on localhost )">
                        <option value={"Krutrim-spectre-v2"}>Krutrim-spectre-v2</option>
                        <option value={"Meta-Llama-3-8B-Instruct"}>Meta-Llama-3-8B-Instruct</option>
                        <option value={"Mistral-7B-Instruct"}>Mistral-7B-Instruct</option>
                    </optgroup>
                </Select>
            </FormControl>
            <label className='w-full ml-5 m-2'>Temperature : <span className='m-1 font-bold'>{temperature}</span></label>
            <Box className="w-[90%] self-center">
                <Slider
                    aria-label="Temperature"
                    defaultValue={0.90}
                    max={2}
                    step={0.01}
                    getAriaValueText={(value) => setTemperature(value)}
                    sx={{ color: "black" }}
                />
            </Box>
            <label className='w-full ml-5 m-2'>Maximum Token : <span className='m-1 font-bold'>{maxTokens}</span></label>
            <Box className="w-[90%] self-center">
                <Slider
                    aria-label="Max Token"
                    defaultValue={1000}
                    max={2048}
                    step={1}
                    getAriaValueText={(value) => setMaxTokens(value)}
                    sx={{ color: "black" }}
                />
            </Box>
            <label className='w-full ml-5 m-2'>Top_P : <span className='m-1 font-bold'>{topP}</span></label>
            <Box className="w-[90%] self-center">
                <Slider
                    aria-label="Top_P"
                    defaultValue={0.90}
                    max={1}
                    step={0.01}
                    getAriaValueText={(value) => setTopP(value)}
                    sx={{ color: "black" }}
                />
            </Box>
            {
                model.includes("gemini") ?
                    <>
                        <label className='w-full ml-5 m-2'>Top_K : <span className='m-1 font-bold'>{topK}</span></label>
                        <Box className="w-[90%] self-center">
                            <Slider
                                aria-label="Top_K"
                                defaultValue={1}
                                max={3}
                                min={0}
                                step={0.1}
                                getAriaValueText={(value) => setTopK(value)}
                                sx={{ color: "black" }}
                            />
                        </Box>
                    </>
                    :
                    <>
                        <label className='w-full ml-5 m-2'>Frequency Penalty : <span className='m-1 font-bold'>{frequencyPenalty}</span></label>
                        <Box className="w-[90%] self-center">
                            <Slider
                                aria-label="Frequency Penalty"
                                defaultValue={1.1}
                                max={2}
                                min={-2}
                                step={0.01}
                                getAriaValueText={(value) => setFrequencyPenalty(value)}
                                sx={{ color: "black" }}
                            />
                        </Box>
                        <label className='w-full ml-5 m-2'>Presence Penalty : <span className='m-1 font-bold'>{presencePenalty}</span></label>
                        <Box className="w-[90%] self-center mb-5">
                            <Slider
                                aria-label="Presence Penalty"
                                defaultValue={0}
                                max={2}
                                min={-2}
                                step={0.01}
                                getAriaValueText={(value) => setPresencePenalty(value)}
                                sx={{ color: "black" }}
                            />
                        </Box>
                    </>
            }
        </div>
    )
}

export default DeveloperOptions
