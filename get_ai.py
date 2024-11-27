from langchain_cohere import ChatCohere
from langchain_core.chat_history import (
    BaseChatMessageHistory,
    InMemoryChatMessageHistory,
)
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage
import os
import getpass
import logging

os.environ["COHERE_API_KEY"] = getpass.getpass() # Your cohere API

model = ChatCohere(model="command-r-plus")
store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]


with_message_history = RunnableWithMessageHistory(model, get_session_history)

config = {"configurable": {"session_id" : "user1"}}

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You will be given a certain text your task is to summerize that text and based on that highlight the key points in that text and create a pending task as a reminder based on the text, DO NOT IN ANY CASE GET OUT OF THE CONTEXT OF THE TEXT PROVIDED",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

chain = prompt | model

with_message_history = RunnableWithMessageHistory(chain, get_session_history)

def invoke_model(human_msg):
    try:
        response = with_message_history.invoke(
            {"message": [HumanMessage(content=human_msg)] },
            config=config)
        return response.content
    except Exception as e:
        logging.error(f"Error while invoking model: {e}")