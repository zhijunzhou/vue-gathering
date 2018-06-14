<template>
  <quill @input="updateFirebase" ref="quill" />
</template>

<script>
import Firebase from 'firebase'
import _ from 'lodash'

const config = {
  apiKey: 'AIzaSyCPyLvrxA3fwNuN_faYRs0Z5LBk6luQJpY',
  authDomain: 'sunlands-code-doc.firebaseapp.com',
  databaseURL: 'https://sunlands-code-doc.firebaseio.com',
  projectId: 'sunlands-code-doc',
  storageBucket: 'sunlands-code-doc.appspot.com',
  messagingSenderId: '473519320425'
}
const app = Firebase.initializeApp(config)
const db = app.database()

export default {
  firebase: {
    quillContent: {
      source: db.ref('/sunlands-code-doc'),
      asObject: true
    }
  },
  methods: {
    updateFirebase: _.debounce(function (content) {
      this.$firebaseRefs.quillContent.set(content)
    })
  },
  mounted () {
    this.$watch('quillContent', (val) => {
      if (this.$refs.quill) {
        this.$refs.quill.editor.setContents(val)
      }
    })
  }
}
</script>
