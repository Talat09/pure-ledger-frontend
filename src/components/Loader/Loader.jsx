import { Box } from "@mui/material";
import { RevolvingDot } from "react-loader-spinner";
const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        mx: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RevolvingDot
        visible={true}
        height="80"
        width="80"
        color="#2397c8"
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Box>
  );
};

export default Loader;
