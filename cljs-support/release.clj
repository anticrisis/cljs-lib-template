(require 'cljs.build.api)

(def source-dir "cljs")
(def out-file "out/main.js")

(cljs.build.api/build source-dir
    {:output-to out-file
     :optimizations :advanced})

(System/exit 0)
