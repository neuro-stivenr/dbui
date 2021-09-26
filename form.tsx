import { AnyMxRecord } from 'dns';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Interface } from 'readline';

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
    style: object;
}

const stateToProp = (state:FormState):InputLineProps => {
    return {
        setter: state.setter,
        title: state.title
    } as InputLineProps
}

const InputLine = (props:InputLineProps) => {
    return (
        <View style={props.style}>
            <TextInput
                placeholder={props.title}
                onChangeText={text => props.setter(text)}
            />
        </View>
    )
}

interface FormProps {
    title: string;
    lineNames: Array<string>;
    style: object;
}

export default function Form(props:FormProps):JSX.Element {
    const numLines: number = props.lineNames.length
    const formState: Array<FormState> = props.lineNames.map(name => {
        return useFormState(name)
    })
    return (
        <View>
            <Text style={{
                textAlign: "center",
                fontSize: 20,
                paddingBottom: 10
            }}>{props.title}</Text>
            { // Array of input lines  
                formState.map(stateToProp).map(prop => {
                    return <InputLine {...prop} style={props.style}/>
                })
            }
        </View>
    )
}