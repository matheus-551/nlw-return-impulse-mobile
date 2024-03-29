import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Options } from '../Options/index';
import { Form } from '../Form';
import { Success } from '../Success'

import { styles } from './styles';
import { theme } from '../../theme/index';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)
  
  function handlerOpen() {
    bottomSheetRef.current?.expand();
  }

  function handlerRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handlerFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity 
        style={styles.button}
        onPress={handlerOpen}
      >
        <ChatTeardropDots
          size={24}
          weight='bold'
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
      
        {
          feedbackSent ?
          <Success
            onSendAnotherFeedback={handlerRestartFeedback}
          />
          : 
          <>{
            feedbackType ?
            <Form
              feedbackType={feedbackType}
              onFeedbackCanceled={handlerRestartFeedback}
              onFeedbackSent={handlerFeedbackSent}
            />
            :
            <Options onFeedbackTypeChanged={setFeedbackType}/>
          }

          </>
        }

      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
