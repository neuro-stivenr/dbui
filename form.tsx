import { AnyMxRecord } from 'dns';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import { Interface } from 'readline';
import { pathToFileURL } from 'url';

const styles = StyleSheet.create({
  inputLine: {
    padding: '10%',
    margin: '10%',
    borderBottomWidth: 1
  },
  inputLineContainer: {
      borderWidth: 0
  },
  formContainer: {
      borderWidth: 3
  },
  formTitle: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Helvetica",
    padding: '10%',
    borderBottomWidth: 2
  },
  formFieldsContainer: {
      padding: 2
  }
});

interface FormState {
    state: any;
    setter: Function;
    title: string
}

const useFormState = (title:string): FormState => {
    let [state, setter] = React.useState("")
    return {
        state: state,
        setter: setter,
        title: title
    } as FormState
}

interface InputLineProps {
    setter: Function;
    title: string;
}

const stateToProp = (state:FormState):InputLineProps => {
    return {
        setter: state.setter,
        title: state.title,
        state: state.state
    } as InputLineProps
}

const InputLine = (props:InputLineProps) => {
    return (
        <View style={styles.inputLineContainer}>
            <TextInput
                style={styles.inputLine}
                placeholder={props.title}
                onChangeText={text => props.setter(text)}
            />
        </View>
    )
}

interface FormProps {
    title: string;
    lineNames: Array<string>;
}


export default function Form(props:FormProps):JSX.Element {
    const numLines: number = props.lineNames.length
    const formState: Array<FormState> = props.lineNames.map(name => {
        return useFormState(name)
    })
    const submitForm = async () => {
        let payload:any = {}
        formState.forEach(entry => {
            payload[entry['title']] = entry.state
        })
        const response = await fetch('http://localhost:5000/api/test', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });
        console.log(response)
    }
    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>{props.title}</Text>
            <ScrollView style={styles.formFieldsContainer}>
                { // Array of input lines  
                    formState.map(stateToProp).map(prop => {
                        return <InputLine {...prop}/>
                    })
                }
            </ScrollView>
            <Button
                title="Submit"
                onPress={submitForm}
            />
        </View>
    )
}