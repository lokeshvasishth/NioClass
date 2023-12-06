import { View, Text, useWindowDimensions, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useCallback, useRef, useState, useEffect, useContext } from 'react'
import { useIsFocused } from '@react-navigation/core'
import { CameraRuntimeError, PhotoFile, useCameraDevice, useCameraFormat, useFrameProcessor, VideoFile, TakePhotoOptions, Camera } from 'react-native-vision-camera'
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf';
import { ImageContext } from '../App';

const CameraPage = () => {
    const { height, width } = useWindowDimensions()
    const navigation: any = useNavigation()
    const [flash, setFlash] = useState('off')
    const [imagepath, setImagepath] = useContext(ImageContext)
    const [modals, setModalS] = useState(false)
    const [switchcamera, setSwitchcamera] = useState('back')

    useEffect(() => {
        requestCameraPermission()
    }, []);
    const camera = useRef<Camera>(null)

    async function requestCameraPermission() {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs access to your camera.',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera permission granted');
                    // You can now access the camera
                } else {
                    console.log('Camera permission denied');
                    // Handle denial of permission
                }
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const saveImageToStorage = async (imageUri:any) => {
        try {
            const directory = RNFS.DocumentDirectoryPath;
            const fileName = `captured_image_${Date.now()}.jpg`;
            const path = `${directory}/${fileName}`;
      
            await RNFS.copyFile(imageUri, path);
            setImagepath(path)
            console.log('Image saved to storage:', path);
          } catch (error) {
            console.error('Error saving image:', error);
          }
          console.log("called")
      };

    const TakePhoto = async () => {
        const file = await camera.current.takePhoto({
            flash: flash,
            qualityPrioritization: 'speed',
        })

        // console.log('asdfgh')

       await saveImageToStorage(file.path);
        // await file.save(`file://${file.path}`, {
        //     type: 'photo',
        // })
        //  saveImageToCameraRoll(`file://${file.path}`);
        
        // console.log(file.path)
        navigation.navigate('ImageView')
    }

    const device = useCameraDevice(switchcamera)

    const convertImageToPDF = async () => {
        try {
          const imagePath = imagepath
          '/path/to/your/image.jpg'; // Replace with your image path
          const pdfPath = `${RNFS.DocumentDirectoryPath}/imageToPdf.pdf`;
    
          const imageBase64 = await RNFS.readFile(imagePath, 'base64');
    
          const pdfDoc = await PDFDocument.create();
          const pdfPage = PDFPage.create().drawImage(`data:image/jpeg;base64,${imageBase64}`, {
            x: 0,
            y: 0,
            width: 612, 
            height: 792, 
          });
    
          pdfDoc.addPages(pdfPage);
          const pdfBytes = await pdfDoc.save();
    
          await RNFS.writeFile(pdfPath, pdfBytes, 'base64');
    
          console.log('Image converted to PDF and saved:', pdfPath);
        } catch (error) {
          console.error('Error converting image to PDF:', error);
        }
      };
    return (
        // <View style={{height:height, width:width, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
        //   <TouchableOpacity style={{height:50, width:150, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:5, elevation:10, flexDirection:'row'}}>
        //     <Text style={{color:'gray', fontSize:16}}>Open Camera</Text>
        //     <Image source={require('../../assets/img/photography.png')} 
        //    style={{height:22, width:22, marginLeft:7}} />
        //   </TouchableOpacity>
        // </View>
        <View style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center' }}>
            {/* {device != null && (

        <Camera
            ref={camera}
            style={{ height: 500, width: width }}
            device={device}
            //   format={format}
            //   fps={fps}
            //   hdr={enableHdr}
            lowLightBoost={device.supportsLowLightBoost && enableNightMode}
            isActive={isActive}
            onInitialized={onInitialized}
            //   onError={onError}
            enableZoomGesture={false}
            enableFpsGraph={true}
            orientation="portrait"
            photo={true}
            video={true}
        />
    )} */}
            <Camera
                style={{ width: width, height: height }}
                ref={camera}
                device={device}
                isActive={true}
                photo={true}
            />

            <View style={{ height: 60, width: width, backgroundColor: 'rgba(0,0,0, 0.5)', position: 'absolute', top: 0, alignItems: 'center', paddingLeft: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { flash == 'on' ? setFlash('off') : setFlash('on') }}>
                    <Image source={require('../assets/img/flash.png')}
                        style={{ tintColor: 'white', height: 30, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { switchcamera == 'back' ? setSwitchcamera('front') : setSwitchcamera('back') }}>
                    <Image source={require('../assets/img/switch-camera.png')}
                        style={{ tintColor: 'white', height: 30, width: 25, resizeMode: 'contain', marginLeft: 20 }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
                TakePhoto()
            }} style={{ height: 85, width: 85, backgroundColor: 'white', position: 'absolute', bottom: 10, borderRadius: 60, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ height: 75, width: 75, backgroundColor: 'black', borderRadius: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 65, width: 65, backgroundColor: 'white', borderRadius: 50, alignSelf: 'center' }}></View>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default CameraPage