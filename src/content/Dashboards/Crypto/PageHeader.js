import { Typography, Avatar, Grid, useTheme } from '@mui/material';

function PageHeader({ UData }) {
  const user = {
    name: UData.name,
    avatar: '/userdp.png'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <div>
          <small> {UData.mobile}</small>
        </div>
        <div>
          <small>{UData.email}</small>
        </div>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
