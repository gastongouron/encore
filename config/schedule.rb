set :output, "../log/cron.log"
every 30.seconds do
  # command "/usr/bin/some_great_command"
  # runner "MyModel.some_method"
  puts '---------------'
  puts 'HELLO WORLD'
  puts '---------------'

  # rake "get_data:test_task"
end

# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
