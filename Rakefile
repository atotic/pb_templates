# http://rake.rubyforge.org/
require 'bundler/setup'
require 'rubygems'
require 'rake'
require 'rake/testtask'

task :environment do
	require_relative '../pb_server/config/settings'
end

def filename_with_pad(filename, pad)
	src = File.expand_path(filename)
	ext = File.extname(src).downcase
	basename = File.basename(src, ext)
	dirname = File.dirname(src)
	filename = "#{basename}_canonical#{ext}"
	"#{dirname}/#{filename}"
end

namespace :image do
	desc "Resizes images into icon/display sizes"
	task :resize, [:filename] => :environment do |t, args|
		puts args.filename

		src = File.expand_path(args.filename)
		ext = File.extname(src).downcase

		basename = File.basename(src, ext)
		dirname = File.dirname(src)

		cmd_line =  "#{SvegSettings.graphicsmagick_binary} convert"
		cmd_line += " -size 1024X1024 #{src} +profile \"*\""

		# display
		filename = "#{basename}_display#{ext}"
		dest_name = "#{dirname}/#{filename}"
		puts filename
		cmd_line += "  -geometry \"#{(1024 * 1.34).to_i}X1024>\" -write #{dest_name}"

		# icon
		filename = "#{basename}_icon#{ext}"
		dest_name = "#{dirname}/#{filename}"
		puts filename
		cmd_line += "  -geometry \"#{(128 * 1.34).to_i}X128>\" #{dest_name}"

		success = Kernel.system cmd_line
		raise("Photo resize failed" + $?.to_s) unless success
	end
	desc "Optimizes svg"
	task :optimize_svg, [:filename] => :environment do | t, args |
		src = File.expand_path(args.filename)
		ext = File.extname(src).downcase

		basename = File.basename(src, ext)
		dirname = File.dirname(src)
		filename = "#{basename}_optimized#{ext}"
		dest = "#{dirname}/#{filename}"
		cmd_line = "/usr/bin/python /Users/atotic/bin/scour/scour.py -i #{src} -o #{dest}"
		success = Kernel.system cmd_line
		raise("Optimize svg failed" + $?.to_s) unless success
		puts "Optimized to #{dest}"
	end
	desc "Clean svg generates svg in the form we expect (with viewbox"
	task :clean_svg, [:filename] => :environment do |t, args|
		require 'nokogiri'
		f = File.open(args.filename)
		doc = Nokogiri::XML(f)
		f.close
		# generate viewBox tag if not present
		svg = doc.css('svg')[0]
		svg['viewBox'] = "0 0 #{svg['width'].to_i} #{svg['height'].to_i}" unless svg.key? 'viewBox'

		# set xml processing directive to canonical form
		xml = doc.to_xml
		xml_directive = '<?xml version="1.0" encoding="utf-8"?>'
		match = xml.match( /(<\?xml[^>]*>)(.*)/m )
		xml = match ? xml_directive + match[2] : xml_directive + xml
		# save a copy
		dest = filename_with_pad( args.filename, "canonical")
		File.open(dest, 'w') { |file| file.write(xml) }
		FileUtils.mv(dest, args.filename)
	end
end
