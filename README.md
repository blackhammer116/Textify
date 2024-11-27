<!DOCTYPE html>
<html lang="en">
<body>
    <div class="container">
        <h1>Textify</h1>
        <p>Welcome to the <strong>Speech To Text</strong> repository! This allows to actively <em>record, transcribe and summerize online meetings</em> by the use of AI and langchain <strong>audience description</strong>.</p>
        <h2>Table of Contents</h2>
        <ul>
            <li><a href="#installation">Installation</a></li>
            <li><a href="#usage">Usage</a></li>
            <li><a href="#contributing">Contributing</a></li>
            <li><a href="#license">License</a></li>
        </ul>
        <h2 id="installation">Installation</h2>
        <p>To get started with this project, follow the steps below:</p>
        <ol>
            <li>Clone the repository:</li>
            <pre><code>git clone https://github.com/blackhammer/Textify.git</code></pre>
            <li>Navigate to the project directory:</li>
            <pre><code>cd Textify</code></pre>
            <li>Install the required dependencies:</li>
            <pre><code>pip install -r requirements.txt</code></pre>
            <li>Move onto the frontend's directory</li>
            <pre><code>cd SpeechToText</code></pre>
            <li>Install the required dependencies:</li>
            <pre><code>npm install</code></pre>
        </ol>
        <h2 id="usage">Usage</h2>
        <p>To run the project, use the following command:</p>
        <pre><code>cd SpeechToText</code></pre>
        <pre><code>npm run dev</code></pre>
        <p>This will spin up the frontend. if you get the following error: </p>
        <pre><code>Error: The following dependencies are imported but could not be resolved:
                        react-mic (imported by Textify/SpeechToText/src/components/ReactRecorder.jsx)
                        axios (imported by Textify/SpeechToText/src/components/ReactRecorder.jsx)
                        Are they installed?</code></pre>
        <p>Run the following command</p>
        <pre><code>npm install axios react-mic --legacy-peer-deps</code></pre>
        <p>Then spin up the backend</p>
        <pre><code>cd ..</code></pre>
        <pre><code>python app.py</code></pre>
        <p>Be sure to use your <strong>own cohere API</strong> for this app otherwise it wont work</p>
        <p>Once the server is up and running, you can access the application at <strong>http://localhost:5000</strong>.</p>
        <h2 id="contributing">Contributing</h2>
        <p>If you'd like to contribute, feel free to fork the repository and submit a pull request. Please make sure to follow the following guidelines:</p>
        <ul>
            <li>Write clear, concise commit messages</li>
            <li>Follow the code style and formatting conventions</li>
            <li>Ensure all tests pass before submitting a PR</li>
        </ul>
        <h2 id="license">License</h2>
        <p>This project is licensed under the MIT License - see the <a href="LICENSE" target="_blank">LICENSE</a> file for details.</p>
    </div>

</body>
</html>
