import fs from 'fs';
import AWS from 'aws-sdk'
import formidable from 'formidable';


const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "sgp1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    }

});

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {

    const form = formidable();

  
    form.parse(req, async (err, fields, files) => {
       
        if (!files.demo) {
            res.status(404).send('no file uploaded');
            return;
        } else {
           
            const min = 100;
            const max = 10000000;
            const Title = 'sm'
            const random = Math.floor(Math.random() * (max - min + 1)) + min;
            const NewName = Title + random + files.demo[0].originalFilename;
    

            try {
                return s3Client.putObject({
                    Bucket: process.env.DO_SPACES_BUCKET,
                    // Key: files.demo.originalFilename,
                    Key: `${process.env.DO_SPACES_FOLDER}/${NewName}`,
                    Body: fs.createReadStream(files.demo[0].filepath),
                    ACL: 'public-read',
                }, async () => res.status(201).send(NewName));
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        }
    });
}
