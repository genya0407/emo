require "erb"

@emo_names = Dir.glob("./public/gallery/*").map { |e| e.match(%r[./public/gallery/(.+).html])[1] }.sort
index_text = ERB.new(File.read("./templates/index.html.erb")).result(binding)
File.write("./public/index.html", index_text)
