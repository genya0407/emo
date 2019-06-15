require "erb"
require "fileutils"

FileUtils.rm_r "./public"
FileUtils.mkdir_p(["./public/javascripts", "./public/gallery"])

emo_names = Dir.glob("./javascripts/*").map { |e| e.match(%r[./javascripts/(.+).js])[1] }.sort

# generate emos
emo_names.each do |emo_name|
  FileUtils.copy("./javascripts/#{emo_name}.js", "./public/javascripts/#{emo_name}.js")
  script = File.read("./javascripts/#{emo_name}.js")
  emo_html = ERB.new(File.read("./templates/emo.html.erb")).result(binding)
  File.write("./public/gallery/#{emo_name}.html", emo_html)
end

# generate index.html
index_html = ERB.new(File.read("./templates/index.html.erb")).result(binding)
File.write("./public/index.html", index_html)
