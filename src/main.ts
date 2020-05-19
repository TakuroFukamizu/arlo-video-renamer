import path from 'path';
import fs from 'fs';

const main = async (input: string) => {
    let filenames = fs.readdirSync(input);
    // console.log(filenames);
    filenames = filenames.filter((v) => { 
        const fullPath = path.join(input, v);
        const st = fs.statSync(fullPath);
        if (st.isDirectory()) return false;
        const ext = path.extname(v).toLowerCase();
        const filename = path.basename(v, ext); // 1589870953133
        if (ext != '.mp4') return false;
        if (filename.length != 13) return false;
        return true;
    });
    console.info(`process ${filenames.length} files`);

    for (const file of filenames) { 
        const fullPath = path.join(input, file);
        console.info(`process file: ${fullPath}`);

        const filename = path.basename(file, path.extname(file)); // 1589870953133
        const ts = parseInt(filename);
        const dt = new Date(ts);
        // console.log(dt.toLocaleString(), dt.toISOString());
        // const outname = `${dt.toISOString().split('T')[0]}-${dt.toLocaleTimeString().split(':').join('-')}.mp4`;
        const outname = `${dt.toLocaleString().split(':').join('-').split(' ').join('_')}.${dt.getMilliseconds()}.mp4`;
        const outpath = path.join(input, outname);
        fs.renameSync(fullPath, outpath);
    }
};

// process.env.TZ = 'Azia/Tokyo'; 
console.log(process.env.TZ);

if (process.argv.length != 3) { 
    process.exit(1);
};
const inputFilePath = process.argv[2];
main(inputFilePath);
