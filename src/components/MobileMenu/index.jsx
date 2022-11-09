import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

function MobileMenu() {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton size="large" edge="start" aria-label="open drawer" />
    </Box>
  );
}

export default MobileMenu;
