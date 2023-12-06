import { View, Text, useWindowDimensions, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useCallback, useRef, useState, useEffect, useContext } from 'react'
import { useIsFocused } from '@react-navigation/core'
import { CameraRuntimeError, PhotoFile, useCameraDevice, useCameraFormat, useFrameProcessor, VideoFile, TakePhotoOptions, Camera } from 'react-native-vision-camera'
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf';
import { ImageContext } from '../App';

const ImageView = () => {
    const { height, width } = useWindowDimensions()
    const navigation: any = useNavigation()
    const [flash, setFlash] = useState('off')
    const [imagepath, setImagepath] = useContext(ImageContext)
    const [modals, setModalS] = useState(false)


    const convertImageToPDF = async () => {
        try {
        //   const imagePath = imagepath
          '/path/to/your/image.jpg'; // Replace with your image path
          const pdfPath = `${RNFS.DocumentDirectoryPath}/imageToPdf.pdf`;
    
          const imageBase64 = await RNFS.readFile(imagepath, 'base64');
    
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
    // const [switchcamera, setSwitchcamera] = useState('back')
  return (
    <View style={{width:width, height:height, }}>
     
    
                {/* <View style={{ height: height, width: width, flexDirection:'row' }}>
                  <TouchableOpacity onPress={() => setModalS(false)}>
                        <Image source={require('../assets/img/share.png')}
                            style={{ height: 35, width: 35, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalS(false)}>
                        <Image source={require('../assets/img/close.png')}
                            style={{ height: 35, width: 35, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                    </View> */}
                    <View style={{ height: height, width: width }}>
                    <View style={{ height: height , width: width }}>
                        <Image source={{ uri: "file://" + imagepath }}
                            style={{ height: height - 45, width: width, resizeMode: 'contain' }} />
                    </View>
                </View>

                <View style={{ height: 60, width: width, backgroundColor: 'rgba(0,0,0, 0.5)', position: 'absolute', top: 0, alignItems: 'center', paddingLeft: 10, flexDirection: 'row' , justifyContent:'space-between', paddingRight:15}}>
                <TouchableOpacity onPress={() =>navigation.goBack()}>
                    <Image source={require('../assets/img/back.png')}
                        style={{ tintColor: 'white', height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> setModalS(true)}
                // onPress={() => { switchcamera == 'back' ? setSwitchcamera('front') : setSwitchcamera('back') }}
                >
                    <Image source={require('../assets/img/share.png')}
                        style={{ tintColor: 'white', height: 30, width: 25, resizeMode: 'contain', marginLeft: 20 }} />
                </TouchableOpacity>
            </View>

 <Modal
                visible={modals}

            >
                <View style={{height:height, width:width, backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent:'center', alignItems:'center'}}>
                <View style={{width:'90%', height:'25%', backgroundColor:'white', borderRadius:8}}>
                <TouchableOpacity onPress={() => setModalS(false)}>
                        <Image source={require('../assets/img/close.png')}
                            style={{ height: 35, width: 35, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => convertImageToPDF()} style={{marginTop: '10%',marginLeft:30}} >
                        <Image source={require('../assets/img/pdf-file.png')}
                            style={{ height: 55, width: 55,  }} />
                    </TouchableOpacity>
                </View>
                </View>
                </Modal>
            
    </View>
  )
}

export default ImageView