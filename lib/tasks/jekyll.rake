namespace :static_pages do
  desc "Build static pages"
  task :build do
    sh "jekyll b --config config/jekyll.yml"
  end
  desc "Watch and rebuild static pages"
  task :watch do
    sh "jekyll b --config config/jekyll.yml --watch"
  end
  desc "Watch and rebuild static pages with drafts"
  task :watch_drafts do
    sh "jekyll b --config config/jekyll.yml --drafts --watch"
  end
  desc "Clean up after Jekyll"
  task :clean do
    sh "jekyll clean --config config/jekyll.yml"
    sh "mkdir public && touch public/.keep"
  end
end