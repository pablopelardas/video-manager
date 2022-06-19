import {spawn} from 'child_process'
import path from 'path'

const convertFilesWebmToMp4 = (sourceVideo: any, outputVideo: any) => new Promise((reject, resolve)=> {
    let options = {
        shell: true
    }
    
    let args = ['-fflags', '+genpts', '-y', '-i', sourceVideo, '-r', '24', outputVideo]
    
    const child = spawn('ffmpeg', args, options)

    
    child.stdout.on('data', (data: any)=> {
        console.log(`Output: ${data}`)
    })

    child.stderr.on('data', (data: any)=> {
        console.log("🚀 ~ file: index.ts ~ line 26 ~ child.stderr.on ~ data", data)
        if(data.includes('Error'))
            reject('Error al procesar el comando')
    })


    child.on('close', (code)=> {
        console.log('resolve', code)
        resolve(code)
    })
})

class VIDEOMANAGER{ 
    createOutputVideo(sourceVideo: any, outputPath: any) {
        const videoName = sourceVideo.split('/').pop().split('.')[0]
        const outputVideo = path.join(outputPath, `${videoName}.mp4`)
        return outputVideo
    }
    async changeFormatVideo(sourceVideo: any, outputPath: any): Promise<string>{
      const outputVideo = this.createOutputVideo(sourceVideo, outputPath)
      try {
        await convertFilesWebmToMp4(sourceVideo, outputVideo)
            return outputVideo
        } catch (error) {
            console.log('videomanager' , error)
            if (error !== 0){
              throw error
            }
            else return outputVideo
        }
    }
}

export default new VIDEOMANAGER()