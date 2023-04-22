import VuexPersister from "vuex-persister";
import Dotenv from'dotenv-webpack'

export default ({ store }) => {
  new VuexPersister({
    configureWebpack: {
      plugins: [
        new Dotenv()
      ]
    }
    // ...
  }).persist(store);
};




