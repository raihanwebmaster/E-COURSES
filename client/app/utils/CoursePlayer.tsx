"use client"
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { ImSpinner2 } from 'react-icons/im';

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
    const [videoData, setVideoData] = useState<{ otp: string; playbackInfo: string; }>({
        otp: '',
        playbackInfo: "",
    })
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/getVdoCipherOTP`, {
            videoId: videoUrl
        })
            .then((res) => {
                setVideoData(res.data.data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [videoUrl])
    return (
        <div style={{ paddingTop: "41%", position: "relative", overflow: "hidden" }}>
            {
                isLoading ? <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                    <ImSpinner2 className="animate-spin text-5xl text-white" />
                </div>
                    : (
                        videoData.otp && videoData.playbackInfo !== "" && (
                            <iframe
                                src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=${process.env.NEXT_PUBLIC_VDOCIPHER_PLAYER_ID}`}
                                style={{
                                    border: 0,
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                                allowFullScreen={true}
                                allow="encrypted-media"
                            ></iframe>
                        )
                    )
            }
        </div>

    )
}

export default CoursePlayer