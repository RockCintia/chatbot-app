import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // Armazena todas as mensagens da conversa
    const [input, setInput] = useState(''); // Armazena a entrada do usuário
    const [waitingForChoice, setWaitingForChoice] = useState(false); // Flag para saber se estamos esperando a escolha do usuário
    const [currentMaterial, setCurrentMaterial] = useState(null); // Estado para armazenar o material escolhido

    // Função que gerencia a resposta do bot com base na entrada do usuário
    const handleResponse = (userInput) => {
        let botMessage = '';
        const normalizedInput = userInput.toLowerCase().replace(/\s+/g, ' ').trim(); // Normaliza a entrada

        // Detecta a escolha do material (Prova, Teste, Lista)
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
            botMessage = getModel(currentMaterial); // Retorna detalhes sobre o Modelo
        } else if (normalizedInput.match(/\bprazo(s)?\b/)) {
            botMessage = getDeadline(currentMaterial); // Retorna a data de entrega
        } else if (normalizedInput.match(/\bvoltar\b/)) {
            botMessage = 'Você quer voltar ao início. Claro! Sobre qual material você quer saber mais? (Prova, Teste ou Lista)';
            setCurrentMaterial(null);
        } else if (normalizedInput.match(/\b(obrigado|obrigada|vlw|t+|bjo|beijo|valeu|tchau|até logo|até breve|obrigadão)\b/)) {
            // Detecta despedidas e agradecimentos, mesmo em frases longas ou com outros caracteres
            botMessage = 'Muito obrigado! Foi um prazer ajudá-lo. Até mais! Se precisar, estou à disposição! 😄';
            setCurrentMaterial(null); // Limpa o material atual
        } else {
            botMessage = `Desculpe, não entendi. Tente perguntar sobre "Prova", "Teste" ou "Lista". Ou digite "voltar" para reiniciar.`;
        }

        setMessages(prevMessages => [...prevMessages, { user: 'bot', text: botMessage }]);
        setWaitingForChoice(true); // Esperando a próxima escolha do usuário
    };

    // Função que retorna o Modelo baseado no material escolhido
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

    // Função que retorna o Prazo baseado no material escolhido
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

    // Função que envia a mensagem do usuário e chama a função de resposta do bot
    const sendMessage = () => {
        const newMessage = { user: 'professor', text: input };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInput(''); // Limpa a entrada do usuário

        if (messages.length === 0) {
            // Se for a primeira mensagem, apresenta uma saudação e opções
            const botMessage = 'Olá! Eu sou seu assistente. Você pode perguntar sobre "Prova", "Teste" ou "Lista". Qual você prefere?';
            setMessages(prevMessages => [...prevMessages, { user: 'bot', text: botMessage }]);
        } else {
            handleResponse(input); // Chama a função de resposta do bot
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 30}}>Atendimento Editorial</Text>
            <ScrollView style={{ flex: 1, marginVertical: 20 }}>
                {messages.map((msg, index) => (
                    <Text
                        key={index}
                        style={{
                            alignSelf: msg.user === 'bot' ? 'flex-start' : 'flex-end',
                            backgroundColor: msg.user === 'bot' ? '#10b3f5' : '#d4edda',
                            padding: 10,
                            marginVertical: 5,
                            borderRadius: 20,
                            maxWidth: '80%',
                        }}
                    >
                        {msg.text}
                    </Text>
                ))}
            </ScrollView>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Digite sua dúvida"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    borderRadius: 20,
                    marginBottom: 10,
                }}
            />
            <Button title="Enviar" onPress={sendMessage} />
        </View>
    );
};

export default Chatbot;
