import { Box, FormControl, InputLabel, Select, Slider } from '@mui/material'
import React, { useEffect, useState } from 'react'


const DeveloperOptions = ({ open, setOpen, setDeveloperOptions }) => {

    const [model, setModel] = useState("models/gemini-2.5-flash");
    const [temperature, setTemperature] = useState();
    const [maxTokens, setMaxTokens] = useState();
    const [topP, setTopP] = useState();
    const [topK, setTopK] = useState();
    const [frequencyPenalty, setFrequencyPenalty] = useState();
    const [presencePenalty, setPresencePenalty] = useState();
    const [provider, setProvider] = useState("gemini");
    const [modelList, setModelList] = useState([
        {
            "provider": "gemini",
            "models": [
                {
                    "name": "models/gemini-2.5-flash",
                    "displayName": "Gemini 2.5 Flash"
                },
                {
                    "name": "models/gemini-flash-latest",
                    "displayName": "Gemini Flash Latest"
                },
                {
                    "name": "models/gemini-flash-lite-latest",
                    "displayName": "Gemini Flash-Lite Latest"
                },
                {
                    "name": "models/gemini-2.5-flash-lite",
                    "displayName": "Gemini 2.5 Flash-Lite"
                },
                {
                    "name": "models/gemma-3-1b-it",
                    "displayName": "Gemma 3 1B"
                },
                {
                    "name": "models/gemma-3-4b-it",
                    "displayName": "Gemma 3 4B"
                },
                {
                    "name": "models/gemma-3-12b-it",
                    "displayName": "Gemma 3 12B"
                },
                {
                    "name": "models/gemma-3-27b-it",
                    "displayName": "Gemma 3 27B"
                },
                {
                    "name": "models/gemma-3n-e2b-it",
                    "displayName": "Gemma 3n E2B"
                },
                {
                    "name": "models/gemma-3n-e4b-it",
                    "displayName": "Gemma 3n E4B"
                }
            ],
        }, {
            "provider": "groq",
            "models": [
                {
                    "name": "groq/compound-mini",
                    "displayName": "Groq (groq/compound-mini)"
                },
                {
                    "name": "llama-3.1-8b-instant",
                    "displayName": "Meta (llama-3.1-8b-instant)"
                },
                {
                    "name": "llama-3.3-70b-versatile",
                    "displayName": "Meta (llama-3.3-70b-versatile)"
                },
                {
                    "name": "meta-llama/llama-4-maverick-17b-128e-instruct",
                    "displayName": "Meta (meta-llama/llama-4-maverick-17b-128e-instruct)"
                },
                {
                    "name": "qwen/qwen3-32b",
                    "displayName": "Alibaba Cloud (qwen/qwen3-32b)"
                },
                {
                    "name": "moonshotai/kimi-k2-instruct",
                    "displayName": "Moonshot AI (moonshotai/kimi-k2-instruct)"
                },
                {
                    "name": "moonshotai/kimi-k2-instruct-0905",
                    "displayName": "Moonshot AI (moonshotai/kimi-k2-instruct-0905)"
                },
                {
                    "name": "meta-llama/llama-4-scout-17b-16e-instruct",
                    "displayName": "Meta (meta-llama/llama-4-scout-17b-16e-instruct)"
                },
                {
                    "name": "openai/gpt-oss-120b",
                    "displayName": "OpenAI (openai/gpt-oss-120b)"
                },
                {
                    "name": "openai/gpt-oss-20b",
                    "displayName": "OpenAI (openai/gpt-oss-20b)"
                },
                {
                    "name": "groq/compound",
                    "displayName": "Groq (groq/compound)"
                },

                {
                    "name": "allam-2-7b",
                    "displayName": "SDAIA (allam-2-7b)"
                },

            ]
        }
    ]);


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
        setDeveloperOptions({ model, temperature, maxTokens, topP, frequencyPenalty, presencePenalty, provider });
    }, [model, temperature, maxTokens, topP, topK, frequencyPenalty, presencePenalty])

    return (
        <div className={`w-full text-black dark:text-black ${open ? "block animate-slideInRight" : "animate-slideOut delay-75"} ${hide ? "hidden" : "block"} mb-3 px-1 bg-white border border-gray-500 rounded-lg flex flex-col`}>
            <FormControl className='w-[90%] self-center mt-5' sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Select Model</InputLabel>
                <Select onChange={(e) => { setModel(e.target.value); setProvider(e.target.options[e.target.selectedIndex].getAttribute("provider")) }} native value={model} id="grouped-native-select" label="Select Model" labelId="demo-simple-select-helper-label">
                    <option aria-label="None" value="" />
                    {
                        modelList?.map((provider, index) => (
                            <optgroup key={index} label={provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}>
                                {
                                    provider.models?.map((modelObj, idx) => (
                                        <option key={idx} value={modelObj?.name} provider={provider.provider}>{modelObj?.displayName}</option>
                                    ))
                                }
                            </optgroup>
                        ))
                    }
                </Select>
            </FormControl>
            <label className='w-full ml-5 m-2 dark:text-black'>Temperature : <span className='m-1 font-bold'>{temperature}</span></label>
            <Box className="w-[90%] self-center">
                <Slider
                    aria-label="Temperature"
                    defaultValue={0.90}
                    max={2}
                    step={0.01}
                    getAriaValueText={(value) => { setTemperature(value) }}
                    sx={{ color: "black" }}
                />
            </Box>
            <label className='w-full ml-5 m-2 dark:text-black'>Maximum Token : <span className='m-1 font-bold'>{maxTokens}</span></label>
            <Box className="w-[90%] self-center">
                <Slider
                    aria-label="Max Token"
                    defaultValue={1000}
                    max={2048}
                    step={1}
                    getAriaValueText={(value) => { setMaxTokens(value) }}
                    sx={{ color: "black" }}
                />
            </Box>
            <label className='w-full ml-5 m-2 dark:text-black'>Top_P : <span className='m-1 font-bold'>{topP}</span></label>
            <Box className="w-[90%] self-center">
                <Slider
                    aria-label="Top_P"
                    defaultValue={0.90}
                    max={1}
                    step={0.01}
                    getAriaValueText={(value) => { setTopP(value) }}
                    sx={{ color: "black" }}
                />
            </Box>
            {
                model.includes("gemini") ?
                    <>
                        <label className='w-full ml-5 m-2 dark:text-black'>Top_K : <span className='m-1 font-bold'>{topK}</span></label>
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
                        <label className='w-full ml-5 m-2 dark:text-black'>Frequency Penalty : <span className='m-1 font-bold'>{frequencyPenalty}</span></label>
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
                        <label className='w-full ml-5 m-2 dark:text-black'>Presence Penalty : <span className='m-1 font-bold'>{presencePenalty}</span></label>
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
