import { AnyMxRecord } from 'dns';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import { Interface } from 'readline';
import { pathToFileURL } from 'url';

const styles = StyleSheet.create({
  inputLine: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1
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
        <View>
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
    const submitForm = () => {
        console.log(formState)
    }
    return (
        <View style={{
            borderWidth: 3
        }}>
            <Text style={{
                textAlign: "center",
                fontSize: 30,
                fontFamily: "Helvetica",
                padding: 10,
                borderBottomWidth: 2
            }}>{props.title}</Text>
            <ScrollView>
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