"use client"
import Particles, { initParticlesEngine } from "@tsparticles/react";
import React, { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const Background = (props) => {
    const [init, setInit] = useState(false);
    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => (
            {
                "autoPlay": true,
                "background": {
                    "color": {
                        "value": "#122342"
                    },
                    "image": "",
                    "position": "50% 50%",
                    "repeat": "no-repeat",
                    "size": "cover",
                    "opacity": 1
                },
                "backgroundMask": {
                    "composite": "destination-out",
                    "cover": {
                        "color": {
                            "value": "transparent"
                        },
                        "opacity": 0
                    },
                    "enable": false
                },
                "backgroundMode": {
                    "enable": true,
                    "zIndex": 0
                },
                "detectRetina": true,
                "fpsLimit": 60,
                "infection": {
                    "cure": false,
                    "delay": 0,
                    "enable": false,
                    "infections": 0,
                    "stages": []
                },
                "manualParticles": [],
                "motion": {
                    "disable": false,
                    "reduce": {
                        "factor": 4,
                        "value": false
                    }
                },
                "particles": {
                    "bounce": {
                        "horizontal": {
                            "random": {
                                "enable": false,
                                "minimumValue": 0.1
                            },
                            "value": 200
                        },
                        "vertical": {
                            "random": {
                                "enable": false,
                                "minimumValue": 0.1
                            },
                            "value": 200
                        }
                    },
                    "collisions": {
                        "bounce": {
                            "horizontal": {
                                "random": {
                                    "enable": false,
                                    "minimumValue": 0.1
                                },
                                "value": 1
                            },
                            "vertical": {
                                "random": {
                                    "enable": false,
                                    "minimumValue": 0.1
                                },
                                "value": 1
                            }
                        },
                        "enable": false,
                        "mode": "bounce"
                    },
                    "color": {
                        "value": ["#7209b7", "#51008a", "#240046", "#000000"],
                        "animation": {
                            "enable": false,
                            "speed": 1,
                            "sync": true
                        }
                    },
                    "life": {
                        "count": 0,
                        "delay": {
                            "random": {
                                "enable": false,
                                "minimumValue": 0
                            },
                            "value": 0,
                            "sync": false
                        },
                        "duration": {
                            "random": {
                                "enable": false,
                                "minimumValue": 0.0001
                            },
                            "value": 0,
                            "sync": false
                        }
                    },
                    "links": {
                        "blink": false,
                        "color": {
                            "value": "#ffffff"
                        },
                        "consent": false,
                        "distance": 100,
                        "enable": true,
                        "frequency": 1,
                        "opacity": 0.4,
                        "shadow": {
                            "blur": 5,
                            "color": {
                                "value": "#00ff00"
                            },
                            "enable": false
                        },
                        "triangles": {
                            "enable": false,
                            "frequency": 1
                        },
                        "width": 1,
                        "warp": false
                    },
                    "move": {
                        "angle": {
                            "offset": 45,
                            "value": 10
                        },
                        "attract": {
                            "enable": false,
                            "rotate": {
                                "x": 600,
                                "y": 1200
                            }
                        },
                        "direction": "none",
                        "distance": 0,
                        "enable": true,
                        "gravity": {
                            "acceleration": 9.81,
                            "enable": false,
                            "maxSpeed": 50
                        },
                        "noise": {
                            "delay": {
                                "random": {
                                    "enable": false,
                                    "minimumValue": 0
                                },
                                "value": 0
                            },
                            "enable": false
                        },
                        "outModes": {
                            "default": "out",
                            "bottom": "out",
                            "left": "out",
                            "right": "out",
                            "top": "out"
                        },
                        "random": true,
                        "size": true,
                        "speed": 2,
                        "straight": false,
                        "trail": {
                            "enable": false,
                            "length": 10,
                            "fillColor": {
                                "value": "#000000"
                            }
                        },
                        "vibrate": false,
                        "warp": false
                    },
                    "number": {
                        "density": {
                            "enable": true,
                            "area": 800,
                            "factor": 1000
                        },
                        "limit": 0,
                        "value": 10
                    },
                    "opacity": {
                        "random": {
                            "enable": false,
                            "minimumValue": 0.1
                        },
                        "value": 0.5,
                        "animation": {
                            "enable": false,
                            "minimumValue": 0.1,
                            "speed": 3,
                            "sync": false
                        }
                    },
                    "reduceDuplicates": false,
                    "rotate": {
                        "random": {
                            "enable": false,
                            "minimumValue": 0
                        },
                        "value": 0,
                        "animation": {
                            "enable": false,
                            "speed": 0,
                            "sync": false
                        },
                        "direction": "clockwise",
                        "path": false
                    },
                    "shadow": {
                        "blur": 0,
                        "color": {
                            "value": "#000000"
                        },
                        "enable": false,
                        "offset": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    "shape": {
                        "options": {
                            "polygon": {
                                "sides": 5
                            },
                            "image": {
                                "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "type": "circle"
                    },
                    "size": {
                        "random": {
                            "enable": true,
                            "minimumValue": 100
                        },
                        "value": 400,
                        "animation": {
                            "destroy": "none",
                            "enable": false,
                            "minimumValue": 0.1,
                            "speed": 20,
                            "startValue": "max",
                            "sync": false
                        }
                    },
                    "stroke": {
                        "width": 0,
                        "color": {
                            "value": "",
                            "animation": {
                                "enable": false,
                                "speed": 0,
                                "sync": false
                            }
                        }
                    },
                    "twinkle": {
                        "lines": {
                            "enable": false,
                            "frequency": 0.05,
                            "opacity": 1
                        },
                        "particles": {
                            "enable": false,
                            "frequency": 0.05,
                            "opacity": 1
                        }
                    }
                },
                "pauseOnBlur": false,
                "themes": []
            }
            ),
        [],
    );

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full -z-50">
                {init && <Particles id={props.id} init={particlesLoaded} options={options}/>}
            </div>
            <div className="absolute top-0 left-0 w-screen h-screen -z-10 backdrop-blur-3xl bg-[rgba(0,4,20,0.65)]"></div>
            <div className="relative z-20">
                {props.children}
            </div>
        </div>
    );
};

export default Background;
