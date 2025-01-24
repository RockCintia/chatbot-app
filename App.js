import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [currentMaterial, setCurrentMaterial] = useState(null);

    useEffect(() => {
        const initialMessage = 'Oi! Que bom te ver por aqui. Estou aqui para te ajudar. Use os botões acima ou escreva sua dúvida abaixo, e farei o meu melhor para ajudar você!';
        setMessages([{ user: 'bot', text: initialMessage }]);
    }, []);

    const handleResponse = (userInput) => {
        let botMessage = '';
        const normalizedInput = userInput.toLowerCase().replace(/\s+/g, ' ').trim();

        if (normalizedInput.match(/\bprova(s)?\b/)) {
            botMessage = 'Você escolheu "Prova"! Quer saber sobre o "Modelo" ou o "Prazo"?';
            setCurrentMaterial('prova');
        } else if (normalizedInput.match(/\bteste(s)?\b/)) {
            botMessage = 'Você escolheu "Teste"! Gostaria de saber o "Modelo" ou o "Prazo"?';
            setCurrentMaterial('teste');
        } else if (normalizedInput.match(/\blista(s)?\b/)) {
            botMessage = 'Você escolheu "Lista"! Prefere saber sobre o "Modelo" ou o "Prazo"?';
            setCurrentMaterial('lista');
        } else if (normalizedInput.match(/\bmodelo(s)?\b/)) {
            botMessage = getModel(currentMaterial);
        } else if (normalizedInput.match(/\bprazo(s)?\b/)) {
            botMessage = getDeadline(currentMaterial);
        } else if (normalizedInput.match(/\bvoltar\b/)) {
            botMessage = 'Você quer voltar ao início. Claro! Sobre qual material você quer saber mais? (Prova, Teste ou Lista)';
            setCurrentMaterial(null);
        } else if (normalizedInput.match(/\b(obrigado|obrigada|vlw|tchau)\b/)) {
            botMessage = 'Foi um prazer ajudá-lo. Até mais! Se precisar, estou à disposição! 😄';
            setCurrentMaterial(null);
        } else {
            botMessage = `Desculpe, não entendi. Tente perguntar sobre "Prova", "Teste" ou "Lista". Ou digite "voltar" para reiniciar.`;
        }

        setMessages(prevMessages => [...prevMessages, { user: 'bot', text: botMessage }]);
    };

    const getModel = (material) => {
        switch (material) {
            case 'prova':
                return 'A Prova tem 3 questões objetivas e 7 discursivas. Cada questão objetiva tem 5 alternativas de resposta.';
            case 'teste':
                return 'O Teste contém 10 questões objetivas, cada uma com 5 alternativas de resposta.';
            case 'lista':
                return 'A Lista possui 5 questões discursivas.';
            default:
                return 'Desculpe, não consegui identificar o material. Tente "Prova", "Teste" ou "Lista".';
        }
    };

    const getDeadline = (material) => {
        switch (material) {
            case 'prova':
                return 'A Prova precisa ser entregue até o dia 20/03/2025.';
            case 'teste':
                return 'O Teste deve ser entregue até o dia 15/02/2025.';
            case 'lista':
                return 'A Lista tem prazo até o dia 31/01/2025.';
            default:
                return 'Desculpe, não consegui identificar o material. Tente "Prova", "Teste" ou "Lista".';
        }
    };

    const sendMessage = () => {
        const newMessage = { user: 'professor', text: input };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInput('');
        handleResponse(input);
    };

    const resetChat = () => {
        setMessages([]);
        setCurrentMaterial(null);
        const initialMessage = 'Oi! Que bom te ver por aqui. Estou aqui para te ajudar. Use os botões acima ou escreva sua dúvida abaixo, e farei o meu melhor para ajudar você!';
        setMessages([{ user: 'bot', text: initialMessage }]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atendimento Editorial</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.choiceButton} onPress={() => handleResponse('prova')}>
                    <Text style={styles.choiceButtonText}>Prova</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choiceButton} onPress={() => handleResponse('teste')}>
                    <Text style={styles.choiceButtonText}>Teste</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choiceButton} onPress={() => handleResponse('lista')}>
                    <Text style={styles.choiceButtonText}>Lista</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                {messages.map((msg, index) => (
                    <Text
                        key={index}
                        style={[
                            styles.message,
                            msg.user === 'bot' ? styles.botMessage : styles.userMessage
                        ]}
                    >
                        {msg.text}
                    </Text>
                ))}
            </ScrollView>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Digite sua dúvida"
                style={styles.input}
            />
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.backButton} onPress={resetChat}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    choiceButton: {
        backgroundColor: '#10b3ff',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    choiceButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        marginVertical: 10,
    },
    message: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 20,
        maxWidth: '80%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#10b3ff',
        color: '#fff',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d4edda',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backButton: {
        backgroundColor: '#f8d7da',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        marginRight: 5,
    },
    backButtonText: {
        color: '#721c24',
        textAlign: 'center',
    },
    sendButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        marginLeft: 5,
    },
    sendButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Chatbot;
