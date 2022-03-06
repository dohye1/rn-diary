import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import LogContext from '../contexts/LogContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import WriableEditor from '../components/WritableEditor';
import WriteHeader from '../components/WriteHeader';

export default function WriteScreen() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigation = useNavigation();
  const {onCreate} = useContext(LogContext);

  const onSave = () => {
    onCreate({title, body, date: new Date().toISOString()});
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} />
        <WriableEditor
          title={title}
          body={body}
          onChangeBody={setBody}
          onChangeTitle={setTitle}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  avoidingView: {flex: 1},
});
