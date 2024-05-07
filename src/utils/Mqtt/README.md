# MQTT integration within electron

## Setup

- Add the following meta tag to the index.html of the app:
  `<meta http-equiv="Content-Security-Policy" content="connect-src ws://%REACT_APP_MQTT_HOST%">`
- Edit/add a .env file and set REACT_APP_MQTT_HOST to the mqtt host, exclude the protocol (ws:// or mqtt://) from the url.
- npm install mqtt --save mqtt mqtt-pattern process buffer url
- Download https://bitbucket.org/omm_dev/mqtt-react-hooks/src/main/ as a zip, expand into the src directory. I suggest placing the contents in the utils/mqtt-react-hooks directory.
- Wrap the app in the Connector context (import this from the mqtt-react-hooks folder you downloaded using `import { Connector } from <folder_path_here>`), passing process.env.REACT_APP_MQTT_HOST to the brokerUrl prop to grant your app access to the MQTT server.

## To send MQTT Messages

- `import { useMqttState } from <folder_path_here>`
- Add the following line to the beginning of your functional component:
  `const { client } = useMqttState()`
- Client is an instance of the mqtt client. client.publish(TOPIC, MESSAGE) is the function call and format needed to send messages;

## To recieve messages

- `import { useSubscription } from <folder_path_here>`
- ```
  const { message } = useSubscription(TOPICS[]);
  ```
- Note that you can pass an array of topics to useSubscription if you need to listen to multiple topics.

**Project is a direct copy of the work at https://github.com/VictorHAS/mqtt-react-hooks at commit
2f3b7d2; check here for any additional information you might need. Project is pinned at React v18, which makes it incompatible with some OMM projects.**
