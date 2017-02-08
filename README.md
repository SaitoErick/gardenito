# GARDENITO
> O projeto Gardenito surgiu de uma ação do Dia das Mulheres, incentivando a participação de mulheres em Dojos na garagem. O projeto consiste em um dispositivo IoT com sensores que monitoram o ambiente de uma planta. Através de um aplicativo mobile, podemos saber se a temperatura e luminosidade estão adequadas e saber quando regar a planta ou mudar de lugar.

## Assets

Na pasta gardenito assets você pode encontrar os Assets, imagens e PSDs, do App para maior ilustração.

## Instalação

Para rodar o Ionic 1 no computador é necessário a instalação do Cordova e do Ionic globalmente.     
Então rode os seguintes comandos:

* `npm install -g cordova`
* `npm install -g ionic`

PS: caso seja Linux é necessário inserir `sudo` antes do `npm`.   
Finalizando as instalações acima, rode o comando abaixo para instalar as dependencias do projeto:

* `npm install`

## Rodar o App

É possivel rodar/subir o App através da ferramenta [Ionic Lab](http://lab.ionic.io/) (faça o download e rode na sua maquina), ou diretamente no browser através do seguinte comando:

* `ionic serve`


## Para Desenvolvedor

Para rodar uma versão emulada de `Android` é necessário instalar [Java SDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html) e o [Android SDK](https://developer.android.com/studio/index.html).   

E para rodar uma versão emulada do `IOS`, ou gerar a versão final é necessario utilizar um Mac.      

Para compilar o projeto em arquivos finais, rodar o seguintes comandos:

* `ionic build android`
* `ionic build ios` 

### Outras informações sobre o projeto
Para obter outras informações sobre o App, rode os seguintes comandos:

* `ionic info`
* `ionic platform list`
* `ionic platform add ios --save` / `ionic platform add android --save` 
* `cordova telemetry on`
* `cordova platform version android`

###Links uteis:

* [Ionic Creator](http://creator.ionic.io/)
* [Cordova](https://cordova.apache.org/)
* [Windows Android Variables](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)
* [Ionic Components](http://ionicframework.com/docs/v2/components/#overview)


#### Web Design Instructions

* Font Cairo - https://fonts.google.com/specimen/Cairo
* green-dark-default: #002a02 

### API
* [Link API](https://apis-explorer.appspot.com/apis-explorer/?base=https://cit-gardenito.appspot.com/_ah/api#p/)
* [Google Endopoints](https://cloud.google.com/appengine/docs/java/endpoints/)
