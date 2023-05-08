<template>
  <div
    :class="{fullscreen: fullscreen}"
    class="tinymce-container"
    :style="{width: containerWidth}"
  >
    <tinymce-editor
      :id="id"
      v-model="tinymceContent"
      :init="initOptions"
    />
  </div>
</template>

<script lang="ts">
// Docs: https://www.tiny.cloud/docs/advanced/usage-with-module-loaders/
// Import TinyMCE
import 'tinymce/tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// Import themes
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import { plugins, toolbar } from './config'
import request from '@/utils/request'

const defaultId = () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

@Component({
  name: 'Tinymce',
  components: {
    TinymceEditor
  }
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string
  @Prop({ default: defaultId }) private id!: string
  @Prop({ default: () => [] }) private toolbar!: string[]
  @Prop({ default: '360px' }) private height!: string | number
  @Prop({ default: 'auto' }) private width!: string | number

  private fullscreen = false
  // https://www.tiny.cloud/docs/configure/localization/#language
  // when adding a new language, please also add the corresponding lang file under public/tinymce/langs folder
  private languageTypeList: { [key: string]: string } = {
    zh: 'zh_CN'
  }

  get language() {
    return this.languageTypeList[AppModule.language]
  }

  get tinymceContent() {
    return this.value
  }

  set tinymceContent(value) {
    this.$emit('input', value)
  }

  get containerWidth() {
    const width = this.width
    // Test matches `100`, `'100'`
    if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
      return `${width}px`
    }
    return width
  }

  get initOptions() {
    return {
      selector: `#${this.id}`,
      height: this.height,
      body_class: 'panel-body',
      object_resizing: false,
      toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      menubar: false,
      plugins: plugins,
      images_upload_url: process.env.VUE_APP_BASE_API + '/stage-api/upload', // 上传图片api地址
      language: this.language,
      language_url: `${process.env.BASE_URL}tinymce/langs/${this.language}.js`,
      skin_url: `${process.env.BASE_URL}tinymce/skins/`,
      emoticons_database_url: `${process.env.BASE_URL}tinymce/emojis.min.js`,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      link_title: false,
      // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      nonbreaking_force_tab: true,
      // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
      // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
      convert_urls: false,
      init_instance_callback: (editor: any) => {
        if (this.value) {
          editor.setContent(this.value)
        }
        editor.on('NodeChange Change KeyUp SetContent', () => {
          this.$emit('input', editor.getContent())
        })
      },
      images_upload_handler: (blobInfo: any, success: any) => {
        this.handleImgUpload(blobInfo, success)
      },
      setup: (editor: any) => {
        editor.on('FullscreenStateChanged', (e: any) => {
          this.fullscreen = e.state
        })
      }
    }
  }

  @Watch('language')
  private onLanguageChange() {
    const tinymceManager = (window as any).tinymce
    const tinymceInstance = tinymceManager.get(this.id)
    if (this.fullscreen) {
      tinymceInstance.execCommand('mceFullScreen')
    }
    if (tinymceInstance) {
      tinymceInstance.destroy()
    }
    this.$nextTick(() => tinymceManager.init(this.initOptions))
  }

  private handleImgUpload(blobInfo: any, success: any) {
    const formdata = new FormData()
    formdata.append('imgs', blobInfo.blob())
    request({
      url: '/stage-api/upload',
      method: 'post',
      data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Access-Token': UserModule.token
      }
    }).then(({ code, data }: any) => {
      if (code === 0) {
        success(process.env.VUE_APP_BASE_API + data[0].url)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;

  .mce-fullscreen {
    z-index: 10000;
  }
}

textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
<style lang="scss">
.tox-tinymce-aux{
  z-index:99999 !important;
}
.tinymce.ui.FloatPanel{
  z-Index: 99;
}
</style>
