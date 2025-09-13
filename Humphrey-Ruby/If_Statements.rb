ismale = false
istall = false
if ismale and istall
    puts "You are a tall male"
elsif ismale and !istall
    puts "You are a short man"
elsif !ismale and istall
    puts "You are not male but you are tall"
else
    puts "You are not male and not tall "
end
    
