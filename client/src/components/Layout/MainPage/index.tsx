import { Box } from "@mui/material";

const MainPage = (child: any) => {
  return (
    <Box
      sx={{
        height: "100%",
        padding: "20px",
      }}
    >
      {child}
    </Box>
  );
};

export default MainPage;
