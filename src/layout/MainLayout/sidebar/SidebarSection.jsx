import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const SidebarDivider = (props) => {
  const { section, subtitle, sidebarFolded } = props;
  return (
    <Box sx={{ p: 2, pt: 4 }}>
      {!sidebarFolded ? (
        <>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "primary.main" }}
          >
            {section}
          </Typography>
          <Typography variant="caption">{subtitle}</Typography>
        </>
      ) : (
        <Divider sx={{ m: 0 }} />
      )}
    </Box>
  );
};

export default SidebarDivider;
