import Typography from "@mui/material/Typography"
import Box from "@mui/system/Box"

const AllClear = ({ ...props }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "240px",
                flexDirection: "column",
            }}
            {...props}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "180px",
                    width: "240px",
                    overflow: "hidden",
                }}
            >
                <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeMiterlimit="1.5"
                    viewBox="0 0 220 200"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "240px" }}
                >
                    <g transform="matrix(.733333 0 0 .666667 -1320 66.67)">
                        <path d="m1800-100h300v300h-300z" fill="none"></path>
                        <path
                            d="m1172.86 2682.78c.21-.68.65-1.11 1.14-1.11s.93.43 1.14 1.11c1.74 5.8 4.86 16.22 4.86 16.22h-12s3.12-10.42 4.86-16.22z"
                            fill="#d3dffa"
                            transform="matrix(-1.36363805578 0 0 .9750022941 3574.194474 -2557.6225226)"
                        ></path>
                        <path
                            d="m1280 2768.25c0-6.21-2.96-11.25-6.62-11.25h-16.76c-3.66 0-6.62 5.04-6.62 11.25v22.5c0 6.21 2.96 11.25 6.62 11.25h16.76c3.66 0 6.62-5.04 6.62-11.25z"
                            fill="#d3dffa"
                            transform="matrix(-1.69987900563 0 0 1.1000022624 4129.564601 -2961.800417)"
                        ></path>
                        {/*HAND*/}
                        <g fill="transparent">
                            <path
                                d="m1225.19 2687.16c2.18.24 2.18 3.99 1.32 7.01-1.96 6.88-6.1 12.94-8.6 20.05-1.84 5.28-3.39 10.67-4.74 16.1 0 0-.29.92-1.02.9-.92-.01-.94-1.3-.65-2.43 2.74-10.74 6.99-20.97 11.55-31.14 1.22-2.72 2.52-5.61 1.83-8.41 0 0-4.6 4.46-7.6 10.41-12.84 25.46-15.51 54.96-16.59 82.92-.48 12.42-.65 24.84-.51 37.24 0 0 .03.9-.55 1.19-.59.3-1.34-.12-1.44-.88-.5-37.2-.81-74.24 12.36-109.92 2.59-7.03 5.49-14.15 10.12-19.86 1.28-1.59 2.62-3.27 4.52-3.18z"
                                transform="matrix(1.36363805578 0 0 1.5000027963 171.850151779 -4072.10027012)"
                            ></path>
                            <path
                                d="m1223.73 2686.3c3.5.13 4.05 5.63 2.45 9.72-.28.73-.59 1.44-.92 2.14-4.75 10.13-9.16 20.33-12.09 32.16 0 0-.15.62-.6.82-.93.41-1.45-.87-1.07-2.35 1.75-6.88 3.73-13.76 6.45-20.28 2.78-6.68 8.58-13.3 7.14-18.77-.5-1.9-2.26-.99-2.59-2.15-.18-.66.37-1.29 1.23-1.29z"
                                transform="matrix(1.36363805578 0 0 1.5000027963 178.520750779 -4072.10027012)"
                            ></path>
                            <path
                                d="m1223.73 2686.3c3.47.13 4.05 5.61 2.45 9.72-2.28 5.89-5.77 11.24-7.95 17.32-2 5.55-3.64 11.24-5.06 16.99 0 0-2.81 2.93-1.67-1.54 2.79-10.92 7.13-21.22 11.95-31.47 1.17-2.52 2.6-5.29 1.56-7.83-.54-1.31-1.59-.96-2.15-1.37-.7-.53-.36-1.82.87-1.82z"
                                transform="matrix(1.36363805578 0 0 1.5000027963 185.191349779 -4072.10027012)"
                            ></path>
                            <path
                                d="m1256.14 2739.01c2.42.51-.94 6.14-4.78 10.55-7.97 9.15-20.05 13.4-24.52 26.94-1.9 5.75-2.38 12.02-1.75 17.96 0 0-.19 1.13-1.03 1.1-1.44-.05-1.16-2.84-1.17-5.19-.08-12.4 4.78-24.37 16.07-32.8 6.16-4.59 12.58-9.37 15.63-16.56 0 0-2.58-.01-2.58-.01-.69.01-.82.04-1.21.12-5.98 1.22-8.88 8.54-15.61 10.47-4.44 1.28-9.48-.71-11.9-5.16 0 0-.47-1.07.33-1.49 1.68-.89 2.63 3.91 6.41 4.9 5.42 1.42 10.17-4.05 15.23-8.04 1.93-1.51 4.21-2.77 6.74-2.8h4c.05 0 .09.01.14.01z"
                                transform="matrix(1.36363805578 0 0 1.5000027963 171.850151779 -4072.10027012)"
                            ></path>
                            <path
                                d="m1224.98 2687.16c-3.75.2-6.11 5.19-8.74 10.13-13.86 26.11-16.45 56.69-17.55 85.21-.48 12.44-.65 24.9-.5 37.34 0 0 .8 2.15 1.79.88.48-.62.19-1.9.18-3.02-.26-40.1-.6-81.85 16.66-117.14 1.94-3.94 3.93-8.17 7.17-10.8.33-.27.89-.56.89-.56 1.35 5.11-2.96 10.75-5.32 15.71-3.76 7.94-6.23 16.45-8.33 24.94 0 0 1.08 3.89 2.2-.57 2.91-11.37 8.1-21.78 12.4-33.08.94-2.49 1.65-5.2.92-7.73 0 0-.39-1.32-1.77-1.31z"
                                transform="matrix(-1.36363805578 0 0 1.5000027963 3716.842668 -4072.10027012)"
                            ></path>
                            <path
                                d="m1223.56 2686.3c-1.18.08-1.32 1.7.24 2.01 2.03.48 1.48 4.33.73 6.44-.17.47-.36.93-.56 1.39-4.54 10.58-9.59 20.9-12.74 33.71 0 0-.16.81.35 1.18.79.59 1.54-.52 1.85-1.75 1.76-6.86 3.72-13.73 6.44-20.19 2.25-5.34 5.93-10.14 7.14-15.73.66-3.01.07-7.16-3.45-7.06z"
                                transform="matrix(-1.36363805578 0 0 1.5000027963 3710.172069 -4072.10027012)"
                            ></path>
                            <path
                                d="m1223.56 2686.3c-1.19.08-1.29 1.75.21 2.01 2.02.41 1.52 4.31.76 6.44-.17.47-.36.93-.56 1.39-4.47 10.47-9.46 20.63-12.64 33.3 0 0-.4.99.15 1.51.72.69 1.62-.34 1.95-1.67 2.56-9.99 5.99-19.65 10.73-28.89 2.42-4.74 5.49-11.5.73-13.8-.41-.2-.67-.31-1.33-.29z"
                                transform="matrix(-1.36363805578 0 0 1.5000027963 3703.50147 -4072.10027012)"
                            ></path>
                            <path
                                d="m1254.52 2741.17c-3.29 7.53-10.89 12.72-16.97 17.49-9.79 7.66-15.8 20.53-14.49 35.67 0 0 .94 2.11 1.85.81.3-.43.14-1.07.09-1.7-.78-11.44 2.35-23.41 11.67-31.48 7.19-6.22 16.19-11.06 19.9-20.51.81-2.08.2-2.4-.57-2.45h-4c-7.76.08-11.82 9.49-18.06 10.85-3.49.76-7.14-1.07-8.96-4.5 0 0-1.56-1.08-1.86.25-.54 2.35 3.75 5.77 7.18 6.35 8.38 1.41 14.65-10.87 21.71-10.95 0 0 2.78-.46 2.51.17z"
                                transform="matrix(-1.36363805578 0 0 1.5000027963 3716.842668 -4072.10027012)"
                            ></path>
                        </g>
                        <path
                            d="m1189.99 2692.35c-15.99-2.4-28.21-15.23-28.21-30.69 0-17.15 15.06-31.08 33.61-31.08s33.61 13.93 33.61 31.08c0 15.87-12.88 28.97-29.48 30.86l-3.59 7.78c-.21.44-.65.73-1.14.73s-.93-.29-1.13-.73z"
                            fill="transparent"
                            transform="matrix(1.36363805578 0 0 1.5000027963 313.126768 -4034.60027963)"
                        ></path>
                        <path
                            d="m1180 2660 12 12 19.4-19.4"
                            fill="none"
                            stroke="transparent"
                            strokeWidth="6.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 313.126768 -4034.60027963)"
                        ></path>
                        <path
                            d="m1280 2767c0-5.52-3.36-10-7.5-10h-15c-4.14 0-7.5 4.48-7.5 10v25c0 5.52 3.36 10 7.5 10h15c4.14 0 7.5-4.48 7.5-10z"
                            fill="#d3dffa"
                            transform="matrix(1.8181829341 0 0 1.5000027963 -391.391111 -4064.60008142)"
                        ></path>
                        <path
                            d="m1180.09 2749c1.88.25.82 1.96-.09 2h-20c-.57-.03-.62-.18-.77-.36-.49-.59-.13-1.6.77-1.64 6.7 0 13.4-.29 20.09 0z"
                            fill="#355db5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 313.126768 -4031.60020415)"
                        ></path>
                        <path
                            d="m1180.09 2749c1.7.25.8 1.96-.09 2h-20c-1.78-.08-.98-1.95 0-2 6.69 0 13.4-.31 20.09 0z"
                            fill="#355db5"
                            transform="matrix(1.43182012961 0 0 1.5000027963 305.087841 -4034.60027963)"
                        ></path>
                        <path
                            d="m1180.09 2749c.98.14 1.15 1.94-.09 2h-20c-1.01-.05-1.31-1.94 0-2 6.69 0 13.4-.31 20.09 0z"
                            fill="#355db5"
                            transform="matrix(1.43182012961 0 0 1.5000027963 305.087841 -4022.60029538)"
                        ></path>
                        <path
                            d="m1180.09 2749c1.9.26.97 1.95-.09 2h-20c-2.22-.1-1.07-1.95 0-2 6.7 0 13.4-.29 20.09 0z"
                            fill="#355db5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 313.126768 -4019.6002199)"
                        ></path>
                        <path
                            d="m1180.09 2749c1.9.26.97 1.95-.09 2h-20c-2.22-.1-1.07-1.95 0-2 6.7 0 13.4-.29 20.09 0z"
                            fill="#355db5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 313.126768 -4007.60023565)"
                        ></path>
                        <path
                            d="m1172.86 2682.78c.21-.68.65-1.11 1.14-1.11s.93.43 1.14 1.11c1.74 5.8 4.86 16.22 4.86 16.22h-12s3.12-10.42 4.86-16.22z"
                            fill="#d3dffa"
                            transform="matrix(1.36363805578 0 0 .9750022941 310.390112 -2557.6225226)"
                        ></path>
                        <path
                            d="m1361.4 2741.03c-.97.35-1.13 1.54.62 2.17 9.61 3.52 18.39 9.52 23.26 19.27 3.94 7.89 3.35 17.61.39 25.98-2.8 7.92-7.29 15.19-7.42 24.19-.12 7.59 4.66 14.34 6.07 22.12.66 3.62.68 7.34.2 10.98 0 0 .52 1.92 1.57 1.12.4-.3.42-.89.49-1.43.96-8.13-1.58-16.09-4.58-24.15-2.94-7.94-.91-17.27 3.33-26.71 5-11.22 6.91-24.41.68-34.93-5.16-8.73-13.53-14.7-22.93-18.19-.62-.22-1.24-.49-1.68-.42z"
                            fill="#d3dffa"
                            transform="matrix(-1.36363805578 0 0 1.5000027963 3714.961217 -4072.10027012)"
                        ></path>
                        <path
                            d="m1295.37 2738.85c15.82.01 31.7-.15 47.43.03 9.07.14 18.29 1.07 26.55 4.79 1.51.68 1.3.87 1.18 1.41-.3 1.39-3.05-.1-5.1-.83-10.35-3.65-21.71-3.38-32.7-3.36-27.36.02-54.84-.15-82.09.11-6.18.09-12.39.92-18.07 3.41 0 0-1.21.15-1.38-.72-.26-1.34 2.25-1.86 4.29-2.51 7.34-2.31 15.16-2.18 23.01-2.23 12.28-.07 24.54-.1 36.88-.1z"
                            fill="#d3dffa"
                            transform="matrix(1.36363805578 0 0 1.5000027963 171.846902 -4072.10027012)"
                        ></path>
                        <path
                            d="m1369.59 2743.86c2.86.2 9.19 5.1 12.8 10.59 0 0-.21 3.26-1.94.68-2.81-4.08-6.83-7.22-11.33-9.36 0 0-.99-1.91.47-1.91z"
                            fill="#d3dffa"
                            transform="matrix(1.36363805578 0 0 1.5000027963 171.846902 -4072.10027012)"
                        ></path>
                        <path
                            d="m1233.47 2720.33c9.18.09 17.86 5.35 21.97 14.16.85 1.83 1.77 3.65 1.56 5.61 0 0-.26.86-1 .9h-5.03c-6.15-.38-6.77-11.32-15.86-11.74-7.55-.35-14.33 7.96-10.13 16.1 0 0-.72 3.09-1.99.5-3.2-6.7-.01-15.83 7.36-18.04 5.54-1.66 11.43.52 15.32 5.73 1.67 2.24 3.2 5.28 5.35 5.45h3.99c-.23-2.35-1.6-4.34-2.81-6.4-5.28-9.01-18.62-13.72-27.1-8.21-.82.53-.54.39-.67.43-.96.34-2.15-.98-.42-2.11 2.74-1.78 6.21-2.39 9.46-2.38z"
                            //HAND
                            fill="transparent"
                            transform="matrix(1.36363805578 0 0 1.5000027963 171.846902 -4072.10027012)"
                        ></path>
                        <path
                            d="m1234.17 2727.24c-8.67.2-15.53 10.03-11.02 18.94 0 0 2.9 1.37 1.65-1.19-2.73-5.7-.07-13.45 6.22-15.28 3.83-1.11 8.16-.2 10.99 2.61 3.21 3.19 4.78 8.42 8.96 8.68h5.03c1.54-.09 1-3.1.15-4.95-3.93-8.59-11.45-15.38-22.07-15.71-3.71-.12-7.71.46-10.6 2.75 0 0-.69 2.94 1.43 1.42 7.71-5.33 20.78-1.28 26.21 6.4 1.82 2.57 3.61 5.69 3.88 8.03 0 0-3.2.45-4.61-.08-4.44-1.64-6.09-9.79-12.84-11.31-1.11-.24-2.25-.32-3.38-.31z"
                            //HAND
                            fill="transparent"
                            transform="matrix(-1.36363805578 0 0 1.5000027963 3716.842668 -4072.10027012)"
                        ></path>
                        <path
                            d="m1381.81 2754.03c1.39.5 2.09 2.63 3.1 4.19 6.18 9.61 6.36 22.15 1.56 33.71-3.13 7.56-7.17 15.01-6.09 23.37 1.06 8.21 6.22 15.6 6.47 24.41.05 2.1-.07 4.21-.35 6.3 0 0-.12.81-.69 1-1.74.59-.84-4.18-.97-7.56-.44-10.75-7.92-19.83-6.23-31.39 1.77-12.14 10.56-22.33 9.28-36.27-.53-5.76-3.62-10.9-6.89-15.82 0 0-1.09-2.25.81-1.94z"
                            fill="#d3dffa"
                            transform="matrix(1.36363805578 0 0 1.5000027963 171.846902 -4072.10027012)"
                        ></path>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="black"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 147.388039 -4021.85027651)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="#d3dffa"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 61.525457 -3988.89487304)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="#d3dffa"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 65.117318 -3935.93165996)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="#d3dffa"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 69.735425 -3914.843518214)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="#d3dffa"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 298.930365 -3988.40629658)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="#d3dffa"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 296.022668 -3937.8827891)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="black"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 178.175419 -4021.85027651)"
                        ></circle>
                        <circle
                            cx="1293.5"
                            cy="2706.5"
                            fill="black"
                            r="3.5"
                            transform="matrix(1.36363805578 0 0 1.5000027963 210.331127 -4021.85027651)"
                        ></circle>
                    </g>
                </svg>
            </Box>
            <Typography sx={{ mt: 2 }}>...no notes</Typography>
        </Box>
    )
}

export default AllClear
