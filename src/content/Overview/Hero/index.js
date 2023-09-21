import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

import Link from 'src/components/Link';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

  img {
    width: 60%;
    height: 60%;
    display: block;
  }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Tokyo Free White Next.js Javascript Admin Dashboard
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            High performance React template built with lots of powerful
            Material-UI components across multiple product niches for fast &
            perfect apps development processes
          </TypographyH2>
          <Button
            component={Link}
            href="/dashboards/crypto"
            size="large"
            variant="contained"
          >
            Browse Live Preview
          </Button>
          <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://bloomui.com/product/tokyo-free-white-react-nextjs-javascript-material-ui-admin-dashboard"
            size="large"
            variant="text"
          >
            Key Features
          </Button>
          <Grid container spacing={3} mt={5}>
            <Grid item md={4}>
              <MuiAvatar>
                <img
                  src="/static/images/logo/material-ui.svg"
                  alt="Material-UI"
                />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Powered by MUI (Material-UI)</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  A simple and customizable component library to build faster,
                  beautiful, and accessible React apps.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <NextJsAvatar>
                <img src="/static/images/logo/next-js.svg" alt="NextJS" />
              </NextJsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Built with Next.js</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Next.js gives you the best developer experience with all the
                  features you need for production.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <JsAvatar>
                <img
                  src="/static/images/logo/javascript.svg"
                  alt="Javascript"
                />
              </JsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Built with Javascript</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Tokyo features a modern technology stack and is built with
                  React + Javascript.
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
        quasi aliquam eligendi, placeat qui corporis!
      </p>
    </Container>
  );
}

export default Hero;
